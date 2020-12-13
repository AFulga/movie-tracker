import React from 'react';
import { STATUS, generateConfig } from '../utils';

const useFetchCallback = (url, method = 'GET', body = undefined) => {
  const [state, setState] = React.useState({
    status: STATUS.IDLE,
    data: null,
    error: null,
  });

  // const prepareData = JSON.stringify(body);

  const callback = React.useCallback(() => {
    setState({ status: STATUS.PENDING });
    console.log('body', body);
    fetch(url, generateConfig(method, body))
      .then((data) => {
        if (data.status >= 300) {
          throw new Error(`Fetch failed with status ${data.status}`);
        }
        return data.json();
      })
      .then((data) => {
        setState({ status: STATUS.RESOLVED, data });
      })
      .catch((err) => {
        setState({ status: STATUS.REJECTED, error: err.message });
      });
  }, [url, method, body]);

  return [callback, state];
};

export default useFetchCallback;
