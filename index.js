require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const graphclient = require('express-graphql')
const app = express();

process.setMaxListeners(0);
mongoose.set('useCreateIndex', true);

mongoose
    .connect(process.env.MongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


const schema = require('./schema/schema')



app.use('/graphql', graphclient({
    schema,
    graphiql: true
}))

app.listen(3000, () => {
    console.log('Server is running on Port 3000')
})