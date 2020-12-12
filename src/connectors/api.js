// Server API connector
// `/server` folder

const URL = '/api';

export const WATCHLIST = {
  LISTED: 'listed',
  REMOVED: 'removed',
};
export const HISTORY = {
  WATCHED: 'watched',
  REMOVED: 'removed',
};

export const MOVIES_URL = `${URL}/movies`;
export const WATCHLIST_URL = `${URL}/watchlist`;
export const HISTORY_URL = `${URL}/history`;
export const LOGIN_URL = `${URL}/login`;
export const SIGNUP_URL = `${URL}/signup`;
export const USER_URL = `${URL}/user`;
