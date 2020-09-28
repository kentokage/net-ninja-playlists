const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema.js");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross origin requests
app.use(cors());

// connect to mongodb database
const user = "kenny";
const password = "k3nnyPwn5";
mongoose.connect(
  `mongodb+srv://${user}:${password}@cluster0-pcpbz.mongodb.net/test?retryWrites=true&w=majority`
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// setup an endpoint for graphql, hand off control of request to graphqlHTTP (callback)
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// set listening port and callback
app.listen(5000, () => {
  console.log("now listening for requests on port 4000");
});

// we need a way to programattically define how our graph looks, so that graphql knows how to deal with our data and queries
