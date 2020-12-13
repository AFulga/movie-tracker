const { Progress } = require('@chakra-ui/react');
const express = require('express');

const db = require('./db');
const { sleep } = require('./utils');
const firebase = require('./firebase');

const router = express.Router();

// Get all = get('movies')
// get one = get('movies/:movieId)
// add new = post('movies')
// update one = put('movies/:movieId') || patch('movies/:movieId')
// delete one = delete('movies/:movieId')

// router.get('/users/:uid', async (req, res) => {
//   const { uid } = req.params;
//   const user = await db.users.findOne({ uid });

//   if (!user) {
//     res.sendStatus(404);
//   } else {
//     res.send(user);
//   }
// });

router.get('/users/:uid', (req, res) => {
  console.log('in users222');
  const { uid } = req.params;
  res.send(uid);
});

router.post('/users/:uid', async (req, res) => {
  const userData = req.body;
  const { uid } = req.params;
  delete userData._id;
  console.log('userData', userData);
  const user = await db.users.findOneAndUpdate(
    { uid },
    { $set: userData },
    { returnOriginal: false, upsert: true }
  );
  res.send(user);
});

router.get('/movies/:movieId-:uid', async (req, res) => {
  console.log('uid', req.params);
  const { movieId } = req.params;
  const { uid } = req.params;
  const movie = await db.movies.findOne({ movieId, uid });

  await sleep(); // force increase latency, simulates real life experience. Delete this on prod
  if (!movie) {
    res.sendStatus(404);
  } else {
    res.send(movie);
  }
});

router.put('/movies/:movieId-:uid', async (req, res) => {
  const { movieId } = req.params;
  const { uid } = req.params;

  const movieData = req.body;
  delete movieData._id; // Mongo don't let us update this field
  const movie = await db.movies.findOneAndUpdate(
    { movieId, uid },
    { $set: movieData },
    { returnOriginal: false, upsert: true }
  );
  await sleep();
  res.send(movie.value);
});

router.get('/watchlist/:uid', async (req, res) => {
  const { uid } = req.params;
  const movies = await db.movies
    .find({ watchlist: 'listed', uid })
    .sort(['release_date', -1])
    .limit(100)
    .toArray();

  await sleep();
  res.send(movies);
});

router.get('/history/:uid', async (req, res) => {
  const { uid } = req.params;
  const movies = await db.movies
    .find({ history: 'watched', uid })
    .sort(['release_date', -1])
    .limit(100)
    .toArray();

  await sleep();
  res.send(movies);
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then(async (data) => {
      if (data.user) {
        const uid = data.user.uid;
        const user = await db.users.findOne({ uid });

        res.send(user);
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get('/logout', async (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      res.send('Logout success');
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post('/signup', async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const firstName = req.body.firstName;
  const surname = req.body.surname;

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .then(async (data) => {
      if (data.user) {
        const uid = data.user.uid;
        const userData = {
          uid,
          firstName,
          surname,
          email,
          birthDate: null,
          language: null,
        };
        const user = await db.users.findOneAndUpdate(
          { uid },
          { $set: userData },
          { returnOriginal: false, upsert: true }
        );
        res.send(user);
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
