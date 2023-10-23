let express = require("express");
let app = express();
let bodyParser = require("body-parser");

// connect to mongoDB
const { Database } = require("quickmongo");
const db = new Database("mongodb+srv://ys5853:010617@week7.j3evdwv.mongodb.net/?retryWrites=true&w=majority");
db.on("ready", () => {
  console.log("Connected to MongoDB");
});
db.connect();

//to parse JSON
app.use(bodyParser.json());

let coffeeTracker = [];

// app.get('/', (req, res) => {
//   res.send("this is the main page"); 
// })

//add a route on server, that is listening for a post request

app.post('/noCups', (req, res) => {
  console.log(req.body);
  let currentDate = Date();
  let obj = {
    date: currentDate,
    coffee: req.body.number
  }
  // add value to db
  db.push("coffeeTrackerData", obj);
  // coffeeTracker.push(obj);
  // console.log(coffeeTracker);
  res.json({task:"success"});
})

app.use('/', express.static('public'));

app.listen(2000, () => {
  console.log("app is listening at localhost:2000");

})

//add route to get all coffee track information
app.get('/getCups', (req, res) => {
  // fetch from dbb
  db.get("coffeeTrackerData").then(coffeeData => {
    let obj = {data: coffeeData};
    res.json(obj);
  })
})
