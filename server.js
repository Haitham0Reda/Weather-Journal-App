// Setup empty JS object to act as endpoint for all routes
let projectData = [];
// Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require("body-parser");
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

const port = 8080;
// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
  console.log(`server running on localhost: ${port}`);
}
// Initialize all route with a callback function

app.get("/allApiData", sendData);

// Callback function to complete GET '/all'
function sendData(request, response) {
  response.send(projectData);
}
// Post Route
app.post("/addToApiData", addData);

function addData(req, res) {
  let newData = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content,
  };
  console.log(req.body);
  projectData.push(newData);
  // projectData.reset(newData);
}
