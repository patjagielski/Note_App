const express = require('express');
const cors = require("cors");
const app = express();
require('dotenv').config();

const notesController=require("./controllers/notes")
app.use(express.json());
app.use(cors());


  app.get("/getNotes", (req, res)=>{
  
    notesController.getNotes(res);
    
  })

  app.post("/addNotes", (req, res)=>{
    const date_created = req.body.date_created;
    notesController.addNotes(date_created,res);
  })

  app.post("/removeNote", (req, res)=>{
    const id = req.body.idnotes;
    notesController.removeNote(id, res);
  })

  app.patch("/editNote", (req, res)=>{
    const id =req.body.idnotes;
    const version = req.body.version;
    const title = req.body.title;
    const content = req.body.content;
    notesController.editNote(version, title, content, id, res);
  })
  
  app.get("/versionHistory",(req,res)=>{
    const id = req.query.id;
    notesController.versionHistory(id,res);
  })

const port = process.env.PORT || 5000;
app.listen(port);
console.log("app is listening to " + port)
module.exports = app





