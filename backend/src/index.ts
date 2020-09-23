// Bring in express
import express from 'express';
// Assert basically test a statement if true or false,
// if false throws error and quits program
import path from 'path';
import * as db from '../dist/db.js';
import terms from '../dist/routes/api/terms.js';

const uri =
  'mongodb+srv://spicyricecaker:manguwu~@cluster0.lvrd8.mongodb.net/langpestDB?retryWrites=true&w=majority';
// Initialize app with express, has a bunch of properties
const app = express();
// Look for environment variable in system before 3000
// basically need this for deployment (e.g. heroku)
const port = process.env.PORT || 3000;

db.connect(uri)
  .then(() => {
    console.log(`Successfully connected to ${uri}`);
    // port, callback

    // Literally THE WORST CODE that you'll ever see but it works for now
    // .get is a route
    // Body parse middleware, allow us to take in post/get request
    app.use(express.json());
    app.use('/api/terms', terms);

    // Set static folder - OP
    app.use(
      express.static(path.join(__dirname, '..', '..', 'frontend', 'public'))
    );

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err: any) => console.log(err));
