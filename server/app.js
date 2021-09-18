const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

mongoose.connect('mongodb+srv://StTrace:1234@cluster0.gwy0v.mongodb.net/graphql-tutorial?retryWrites=true&w=majority --username StTrace', {useUnifiedTopology: true, useNewUrlParser: true});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', ()=> console.log('Connect to DB!'));

app.listen(PORT, err =>  {
    err ?  console.log(err) : console.log('Server started!');
});