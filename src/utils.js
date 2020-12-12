export const getYear = (date) => {
  if (!date || date.length < 4) return 'N/A';
  return date.substr(0, 4);
};

export const runtimeFormat = (minutes) => {
  const min = minutes % 60;
  const hour = (minutes - min) / 60;

  return `${hour}h ${min}m`;
};

export const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export const generateConfig = (method, body) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  return config;
};

export const finReleseByCountry = (arr, countryCode) => {
  let rDate = arr.find((m) => {
    return m.iso_3166_1 === countryCode;
  });
  if (rDate) {
    rDate = rDate.release_dates;

    rDate[0] && (rDate[0].countryCode = countryCode);
  }
  return rDate;
};

export const releaseDateFormat = (date) => {
  const d = new Date(date);
  let day = d.getDate();
  let month = d.getMonth() + 1;
  const year = d.getFullYear();
  day = day < 10 ? `0${day}` : day;
  month = month < 10 ? `0${month}` : month;
  return `${day}/${month}/${year}`;
};

export const getAge = (date) => {
  if (!date) {
    return;
  }
  var ageDifMs = Date.now() - date.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export const releaseDateFormat2 = (date) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const d = new Date(date);
  let day = d.getDate();
  let month = d.getMonth();
  const year = d.getFullYear();

  return `${day} ${monthNames[month]}, ${year}`;
};

export const shuffle = (arr) => {
  const newArr = [...arr];

  for (let i = 0; i < newArr.length; i++) {
    const newIndex = Math.floor(Math.random() * newArr.length);
    const temp = newArr[newIndex];
    newArr[newIndex] = newArr[i];
    newArr[i] = temp;
  }

  return newArr;
};

export const sleep = (duration = 500) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
