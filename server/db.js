const MongoClient = require('mongodb').MongoClient;

// Bad practice: don't keep sensitive data in git
const CONFIG = {
  USER: encodeURIComponent(process.env.mongoUser),
  PASS: encodeURIComponent(process.env.mongoPass),
  URL: process.env.mongoUrl,
  DB: process.env.mongoDB,
};

const uri = `mongodb+srv://${CONFIG.USER}:${CONFIG.PASS}@${CONFIG.URL}/`;

const client = new MongoClient(uri, { useUnifiedTopology: true });
module.exports = { client };

client
  .connect()
  .then(() => console.log('MongoDB Connected'))
  .catch((error) =>
    console.error('Error on connecting to MongoDB server', error)
  )
  .then(() => {
    const movies = client.db(CONFIG.DB).collection('movies');
    const users = client.db(CONFIG.DB).collection('users');
    module.exports.movies = movies;
    module.exports.users = users;
  });
