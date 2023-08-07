const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const connectDB = require('./config/db.js');
const port = process.env.port || 5000;


const schema = require('./schema/schema')

// const { projects, clients } = require('./schema/sampleData.js')

const app = express();  

console.log("NPM running in " + process.env.NODE_ENV)

connectDB();
//app.use is middleware that is used whenever the server is called?
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))

app.listen(port, console.log(`Server running on port ${port}`))

