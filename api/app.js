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
      if(err)
        throw err;
      else
        res.send(rows);
      
    });

  })

  app.post("/addNotes", (req, res)=>{
    connection.query("INSERT INTO	Notes( version, title, date_created, last_modified, content) VALUES ( 0, 'NOTE', NOW(), NOW(), 'Note content goes here')",(err, rows)=>{
      if(err)
        throw err;
      else
        res.send(rows);
    })
  })

  app.post("/removeNote", (req, res)=>{
    const id = req.body.idnotes;
    connection.query("DELETE FROM Notes where idnotes = ?", [id], (err, rows)=>{
      if(err) throw err
      else res.send(rows);
    })
  })

  app.patch("/editNote", (req, res)=>{
    const id =req.body.idnotes;
    const version = req.body.version;
    const title = req.body.title;
    const content = req.body.content;
    const last_modified = req.body.last_modified;
    console.log(version)

    connection.query("UPDATE notes SET version=?, title=?, content=?, last_modified=? WHERE idnotes=?", [version,title,content, last_modified, id], (err, rows)=>{
      if(err) throw err
      else res.send(rows);
    })
  })

const port = process.env.PORT || 5000;
app.listen(port);
console.log("app is listening to " + port)