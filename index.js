const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const req = require("express/lib/request");
const res = require("express/lib/response");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Lakshmi6",
  database: "nodejsreact",
});

app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

app.get("/api/get", (req, res) => {
  const sqlstatement = "select * from contact_db";
  db.query(sqlstatement, (err, result) => {
    //console.log("Error is " + err);
    //console.log("The result is " + result);
    res.send(result);
  });
});

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlstatement = "select * from contact_db where id=?";
  db.query(sqlstatement, id, (err, result) => {
    if (err) {
      console.log("The error in index.js is " + err);
    }
    //console.log("Error is " + err);
    //console.log("The result is " + result);
    res.send(result);
  });
});

app.post("/api/post", (req, res) => {
  const { name, email, contact } = req.body;
  const sqlstatement =
    "insert into contact_db(name,email,contact) values(?,?,?)";
  db.query(sqlstatement, [name, email, contact], (err, result) => {
    if (err) {
      console.log("saierror is " + err);
    }
  });
});

app.put("/api/put/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, contact } = req.body;
  const sqlstatement =
    "update contact_db set name=?,email=?,contact=? where id=? ";
  db.query(sqlstatement, [name, email, contact, id], (err, result) => {
    if (err) {
      console.log("saierror is " + err);
    }
    res.send(result);
  });
});

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlstatement = "delete from contact_db where id=?";
  db.query(sqlstatement, id, (err, result) => {
    if (err) {
      console.log("index.js error is " + err);
    }
  });
});

app.get("/", (req, res) => {
  //   const sqlquery =
  //     "insert into contact_db(name,email,contact) values('neal','neal@yahoo.com',56789654)";
  //   db.query(sqlquery, (err, result) => {
  //     console.log("The error is " + err);
  //     console.log("The result is " + result);
  //     res.send("Hello Express");
  // });
});
