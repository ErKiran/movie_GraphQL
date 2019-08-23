const express = require('express');
const graphclient = require('express-graphql')
const app = express();

const schema = require('./schema/schema')

app.use('/graphql', graphclient({
    schema,
    graphiql: true
}))

app.listen(3000, () => {
    console.log('Server is running on Port 3000')
})