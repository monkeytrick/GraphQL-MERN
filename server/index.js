const express = require('express');
const port = process.env.port || 5000;
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db.js')

const schema = require('./schema/schema')

const { projects, clients } = require('./schema/sampleData.js')

require('dotenv').config();

const app = express();  

connectDB();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server running on port ${port}`))

