import { EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';

import useMovie from '../hooks/useMovie';
import { releaseDateFormat2 } from '../utils';

const {
  Icon,
  Text,
  Box,
  Center,
  CircularProgress,
} = require('@chakra-ui/react');
const { default: DateFnsUtils } = require('@date-io/date-fns');
const { MuiPickersUtilsProvider, DatePicker } = require('@material-ui/pickers');

const DatePick = ({ movieId, whatched_date, release_date, reRender }) => {
  const { movie, updateMovie } = useMovie(movieId);

  const [showPicker, setShowPicker] = useState(false);
  const [watchDate, setWatchDate] = useState(false);

  const handleDateChange = (dt) => {
    updateMovie(
      {
        ...movie,
        whatched_date: dt,
      },
      () => {
        setShowPicker((prev) => !prev);
        reRender(movieId, dt);
      }
    );
  };

  return (
    <>
      <Box display='none'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            width={10}
            value={movie ? movie.whatched_date : whatched_date}
            onChange={handleDateChange}
            onClose={() => setShowPicker((prev) => !prev)}
            format='dd/MM/yyyy'
            minDate={new Date(release_date)}
            maxDate={new Date()}
            open={showPicker}
          />
        </MuiPickersUtilsProvider>
      </Box>
      <Text>{`W: ${releaseDateFormat2(
        movie ? movie.whatched_date : whatched_date
      )}`}</Text>
      <Icon
        as={EditIcon}
        w={6}
        h={6}
        color='green.500'
        _hover={{ color: 'purple.400' }}
        cursor='pointer'
        onClick={() => setShowPicker((prev) => !prev)}
      />
    </>
  );
};

export default DatePick;
