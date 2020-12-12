import React, { useState } from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { STATUS } from '../utils';
import { WATCHLIST } from '../connectors/api';
import { Box } from '@material-ui/core';

export default function WatchlistButton({ movie, update, css = {} }) {
  const [status, setStatus] = useState(STATUS.IDLE);
  const toggleWatchlist = () => {
    update(
      {
        ...movie,
        watchlist:
          movie.watchlist === WATCHLIST.LISTED
            ? WATCHLIST.REMOVED
            : WATCHLIST.LISTED,
      },
      setStatus
    );
  };

  const isListed = movie.watchlist === WATCHLIST.LISTED; // we don't care if watchlist is REMOVED or undefined, both means it's not listed
  const label = isListed ? 'Remove from watchlist' : 'Add to watchlist';

  return (
    <Box css={css}>
      <Tooltip label={label}>
        <IconButton
          aria-label={label}
          icon={<StarIcon />}
          colorScheme='teal'
          variant={isListed ? 'solid' : 'outline'}
          isLoading={status === STATUS.PENDING}
          onClick={toggleWatchlist}
        />
      </Tooltip>
    </Box>
  );
}
