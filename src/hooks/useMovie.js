import React, { useContext } from 'react';
import { STATUS, generateConfig } from '../utils';
import { MOVIES_URL } from '../connectors/api';
import {
  buildMovieCreditsUrl,
  buildMovieReleaseUrl,
  buildMovieUrl,
} from '../connectors/tmdb';
import { UserContext } from '../context/UserContext';

export default function useMovie(movieId) {
  const { user } = useContext(UserContext);
  const [status, setStatus] = React.useState(STATUS.IDLE);
  const [movie, setMovie] = React.useState(null);
  const [error, setError] = React.useState(null);

  // load movie data from our DB or TMDB
  React.useEffect(() => {
    setStatus(STATUS.PENDING);
    setMovie(null);
    setError(null);

    fetch(`${MOVIES_URL}/${movieId}-${user.uid}`)
      .then((data) => {
        if (data.status === 404) {
          // movie is not in our DB, so we will fetch it from TMDB
          // by returning another promise, it will continue the flow of current promise. nice and clean
          return Promise.all([
            fetch(buildMovieUrl(movieId)),
            fetch(buildMovieReleaseUrl(movieId)),
            fetch(buildMovieCreditsUrl(movieId)),
          ]);
        }
        return data;
      })
      .then(async (data) => {
        if (
          (!Array.isArray(data) && data.status >= 300) ||
          (Array.isArray(data) && data.some((dt) => dt.status >= 300))
        ) {
          throw new Error(`Fetch failed with status ${data.status}`);
        }

        if (!Array.isArray(data)) {
          return data.json();
        }

        return Promise.all(data.map((d) => d.json()));
      })
      .then((data) => {
        // Note that this will trigger  2 renders, make sure status is the last one

        const dataToPass = !Array.isArray(data)
          ? data
          : { ...data[0], release_dates: data[1].results, crew: data[2].crew };
        setMovie(dataToPass);
        setStatus(STATUS.RESOLVED);
      })
      .catch((err) => {
        setError(err.message);
        setStatus(STATUS.REJECTED);
      });
  }, [movieId]);

  // define an update method
  // const [updateStatus, setUpdateStatus] = React.useState(STATUS.IDLE);
  const updateMovie = React.useCallback(
    (body, updateStatus) => {
      // setUpdateStatus(STATUS.PENDING);
      updateStatus(STATUS.PENDING);

      fetch(`${MOVIES_URL}/${movieId}-${user.uid}`, generateConfig('PUT', body))
        .then((data) => {
          if (data.status >= 300) {
            throw new Error(`Fetch failed with status ${data.status}`);
          }
          return data.json();
        })
        .then((data) => {
          setMovie(data);
          // setUpdateStatus(STATUS.RESOLVED);
          updateStatus(STATUS.RESOLVED);
        })
        .catch((err) => {
          setError(err.message);
          // setUpdateStatus(STATUS.REJECTED);
          updateStatus(STATUS.REJECTED);
        });
    },
    [movieId]
  );

  return { movie, status, error, updateMovie }; // Bad naming example: updateStatus is an enum, but updateMovie is a function
}
