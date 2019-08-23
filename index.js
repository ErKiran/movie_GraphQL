const express = require('express');
const graphclient = require('express-graphql')
const app = express();

app.use('/graphql', graphclient({

}))

app.listen(3000, () => {
    console.log('Server is running on Port 3000')
})