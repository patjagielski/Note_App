const mysql = require('mysql');
const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

var connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password:"admin",
    database:"polsource",
    port:"3306"
  })
  
  connection.connect((err) =>{
    if(err){
      throw err
    }else{
      console.log("connected");
    }
  })
  
  app.get("/getNotes", (req, res)=>{
    connection.query("SELECT * FROM notes", (err, rows)=>{
      if(err){
        throw err;
      }else{
        res.send(rows);
      }
    });

  })


const port = process.env.PORT || 5000;
app.listen(port);
console.log("app is listening to " + port)