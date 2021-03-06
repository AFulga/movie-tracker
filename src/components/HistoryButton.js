import React, { useContext, useState } from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';
import { STATUS } from '../utils';
import { HISTORY } from '../connectors/api';
import { UserContext } from '../context/UserContext';

export default function HistoryButton({ movie, update, isDisabled = false }) {
  const { user } = useContext(UserContext);
  const [status, setStatus] = useState(STATUS.IDLE);
  const toggleHistory = () => {
    update(
      {
        ...movie,
        uid: user.uid,
        history:
          movie.history === HISTORY.WATCHED ? HISTORY.REMOVED : HISTORY.WATCHED,
        whatched_date: movie.history === HISTORY.WATCHED ? '' : new Date(),
      },
      setStatus
    );
  };

  const isWatched = movie.history === HISTORY.WATCHED; // we don't care if watchlist is REMOVED or undefined, both means it's not listed
  const label = isWatched ? 'Remove from history' : 'Mark as watched';

  return (
    <Tooltip label={label}>
      <IconButton
        aria-label={label}
        icon={isWatched ? <CheckIcon /> : <AddIcon />}
        colorScheme='teal'
        variant={isWatched ? 'solid' : 'outline'}
        isLoading={status === STATUS.PENDING}
        onClick={toggleHistory}
        disabled={isDisabled}
      />
    </Tooltip>
  );
}
