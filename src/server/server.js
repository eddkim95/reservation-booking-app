const express = require('express');
const app = express();
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const Schema = require('./graphQLSchema');
const PORT = 1234;
const cors = require('cors');


require('dotenv').config();

app.use(cors());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err) => {
  if (err) console.log(err);
  else console.log('Connected to database...');
});

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: false,
}));

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Listening on port ${PORT}...`);
});