const { graphqlHTTP } = require("express-graphql");
const myGraphQLSchema = require('./GraphSchema/graphSchema')

const express = require("express");
const connectDb = require("./DB/connectDB");

const app = express();
connectDb();


app.use(express.json());
app.use("/api", require('./routes/apis/books'))
app.use("/api", require('./routes/apis/authors'))

app.use('/graphql', graphqlHTTP({ schema: myGraphQLSchema, graphiql: true }))

app.listen(3000, () => {

    console.log('server is listening on port 3000');

})