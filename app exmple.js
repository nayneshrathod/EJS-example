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
// app.use('/static', express.static(path.join(__dirname, 'public')))
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
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     dbo.createCollection("customers", function(err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       db.close();
//     });
//   });

//   MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var myobj = { name: "Company Inc", address: "Highway 37" };
//     dbo.collection("customers").insertOne(myobj, function(err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();
//     });
//   });

app.get("/qq", function (request, response) {
  // MongoClient.connect(url, function(err, db) {
  //     if (err) throw err;
  //     var dbo = db.db("mydb");
  //     dbo.createCollection("customers", function(err, res) {
  //       if (err) throw err;
  //       console.log("Collection created!");
  //       db.close();
  //     });
  //   });

  dataa = [];

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("customers").findOne({}, function (err, result) {
      // dataa = [];
      if (err) throw err;
      dataa = result;
      // console.log(result)
      console.log(dataa);
      console.log(dataa.name);
      console.log(dataa.address);

      db.close();
    });

    response.render("index", {
      dataa,
      sample: "This is a GET data ",
      name: ["naynesh", "khumesh", "swati"],
    });
  });
});

app.get("/", function (req, res) {
  ans = [];
  data = [];
  dataa = [];
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    // var myobj = { name: "Company Inc", address: "Highway 37" };
    // const cursor = db.collection('customers').find()
    dbo
      .collection("customers")
      .find()
      .toArray()
      .then((results) => {
          
        res.render("index", { dataa: results, ans : "All     document show",sample: "This Is a GET data " });
      })
        .catch(/* ... */)
    //     dbo.collection("customers").find({}, function (err, result) {
    //       if (err) throw err;
    //       console.log("All document Show");
    //       ans = "All     document show";
    //         // data=cursor;
    //         dataa=result;
    //     //  console.log(cursor);
    //      console.log(result);
    //         db.close();
    //     });
    //     res.render("index", {
    //       ans,
    //     //   data,
    //       dataa,
    //       sample: "This Is a GET data ",
    //       name: ["naynesh", "khumesh", "swati"],
    //     });
  });
});

app.post("/", function (request, response) {
  ans = [];

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { name: "Company Inc", address: "Highway 37" };
    dbo.collection("customers").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      ans = "1 document inserted";
      db.close();
    });
    response.render("index", {
      ans,
      sample: "This Is a POST data ",
      name: ["naynesh", "khumesh", "swati"],
    });
  });
});

app.listen(8000, function () {
  console.log("this is port http://localhost:8000/");
});
