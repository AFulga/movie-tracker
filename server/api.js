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

router.get('/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const movie = await db.movies.findOne({ movieId });

  await sleep(); // force increase latency, simulates real life experience. Delete this on prod
  if (!movie) {
    res.sendStatus(404);
  } else {
    res.send(movie);
  }
});

router.put('/movies/:movieId', async (req, res) => {
  const { movieId } = req.params;
  const movieData = req.body;
  delete movieData._id; // Mongo don't let us update this field
  const movie = await db.movies.findOneAndUpdate(
    { movieId },
    { $set: movieData },
    { returnOriginal: false, upsert: true }
  );

  await sleep();
  res.send(movie.value);
});

router.get('/watchlist', async (req, res) => {
  const movies = await db.movies
    .find({ watchlist: 'listed' })
    .sort(['release_date', -1])
    .limit(100)
    .toArray();

  await sleep();
  res.send(movies);
});

router.get('/history', async (req, res) => {
  const movies = await db.movies
    .find({ history: 'watched' })
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
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post('/signup', async (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  const firstName = req.body.firstName;
  const surename = req.body.surename;
  console.log(email, `\n${pass}`, `\n${firstName}`, `\n${surename}`);
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .then((data) => {
      if (data.user) {
        data.user
          .updateProfile({
            displayName: `${firstName}|${surename}`,
          })
          .then(function () {
            res.send(data);
          })
          .catch(function (error) {
            res.send(error);
          });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

router.post('/user', async (req, res) => {
  const firstName = req.body.firstName;
  const surename = req.body.firstName;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      user
        .updateProfile({
          firstName,
          surename,
        })
        .then(function (data) {
          res.send(data);
        })
        .catch(function (error) {
          res.send(error);
        });
      res.send(user);
    } else {
      // No user is signed in.
      res.send('No user');
    }
  });
});

module.exports = router;
