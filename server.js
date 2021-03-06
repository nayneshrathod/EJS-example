var express = require("express");
var bodyParser = require("body-parser");

var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";

var cors = require("cors");
var path = require("path");

var app = express();

app.use(bodyParser());
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("customers", function (err, res) {
    if (err) throw err;6
    console.log("Collection created!");
    db.close();
  });
});

app.get("/", function (req, res) {
  ans = [];
  data = [];
  dataa = [];
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo
      .collection("customers")
      .find()
      .toArray()
      .then((results) => {
        res.render("index", {
          dataa: results,
          ans: "All document show",
          sample: "This Is a GET data ",
        });
      })
      .catch(/* ... */);
  });
});

app.get("/product", function (req, res) {
  ans = [];
  data = [];
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("products")
      .find()
      .toArray()
      .then((results)=>{});
    dbo.collection("products")
      .find({type:"shoes"})
      .toArray()
      .then((results_shoes)=>{});
    dbo.collection("products")
      .find({type:"mobile"})
      .toArray()
      .then((results_mobile) => {
      });
     res.render("product", {
        data: results,
        dataS: results_shoes,
        dataM: results_mobile, 
        ans: "All document show",
        sample: "This Is a GET data ",
    });
  });
});

app.post("/", (req, res) => {
  ans = [];
  sample = [];
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("mydb");
    dbo.collection("customers").insertOne(req.body, (err) => {
      if (err) throw err;
      console.log("Record inserted");
      db.close();
      res.render("index", {
        ans: "Record inserted",
        name: "",
        sample: "This Is a POST data ",
      });
      // res.redirect("http://localhost:9000/login");
    });
  });
});

app.post("/register", (req, res) => {
  ans = [];
  sample = [];
  MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db("mydb");
    dbo.collection("users").insertOne(req.body, (err) => {
      if (err) throw err;
      console.log("Record inserted");
      db.close();
      res.render("register", {
        ans: "Record inserted",
        name: "",
        sample: "This Is a POST data ",
      });
      // res.redirect("http://localhost:9000/login");
    });
  });
});

app.get("/register", (req, res) => {
  res.render("register");
});

 
          
app.post('/login', (req, res) => {
  sample=[];
  ans=[];
  MongoClient.connect(url, (err, db) => {
    const dbo = db.db("mydb");
    dbo.collection('users').findOne({ email: req.body.email, pwd: req.body.pwd }, (err, user) => {
      if (err) {
        res.status(501).send("not found");
      }
      else {
        if (!!user) {
          console.log("user is right")
          res.redirect("http://localhost:8000/");
          // res.render("index",{sample,});
        }
        else {
          console.log("user is wrong") 
          res.redirect("http://localhost:8000/login");

         // res.render("login");
        }
      }
      db.close();
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(8000, function () {
  console.log("this is port http://localhost:8000/");
});
