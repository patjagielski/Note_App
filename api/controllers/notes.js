const moment = require('moment');
const mysqlConnection = require("../util/mysql").simpleMysql
const simpleMysql = new mysqlConnection(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, process.env.DATABASE, process.env.DB_PORT)
const connection = simpleMysql.createConnection();

exports.getNotes = function getNotes(res) {
  connection.query("SELECT * FROM notes", (err, rows) => {
    if (err)
      throw err;
    else
      res.send(rows);
  });
}
function getSpecificNote(id, callback) {
  connection.query("SELECT * FROM notes WHERE idnotes=?",[id], (err, rows) => {
    if (err)
      throw err;
    else
      callback(rows[0]);
  });
}

exports.editNote = function editNote(version, title, content, id, res) {
 
    connection.query("UPDATE notes SET version=?, title=?, content=?, last_modified=NOW() WHERE idnotes=?", [version, title, content, id], (err, rows) => {
      if (err)
        throw err;
      else
        res.send(rows);
        getSpecificNote(id,(result)=>{
        const objectToUpdate = result;
        getAction('UPDATED',(idaction)=>{
        insertIntoHistory(id, objectToUpdate.version, objectToUpdate.title,objectToUpdate.date_created,objectToUpdate.last_modified,objectToUpdate.content, idaction);
        });
      });
    });
    
}

exports.removeNote = function removeNote(id,res) {
  getSpecificNote(id,(result)=>{
    const objectToDelete = result;
    connection.query("DELETE FROM Notes where idnotes = ?", [id], (err, rows) => {
      if (err)
        throw err;
      else
        res.send(rows);
        getAction('DELETED',(idaction)=>{
          insertIntoHistory(id, objectToDelete.version, objectToDelete.title,objectToDelete.date_created,objectToDelete.last_modified,objectToDelete.content, idaction);
        })
    });
    
  });
 
}

exports.addNotes = function addNotes(date_created, res) {
 const defaultContent = 'NOTE CONTENT GOES HERE';
 const defaultTitle = 'NOTE';
 const defaultLastMod = moment().format('YYYY-MM-DD, HH:mm:ss');
  connection.query("INSERT INTO	Notes( version, title, date_created, last_modified, content) VALUES ( 0, ?, ?, ?, ?)", [defaultTitle,date_created,defaultLastMod,defaultContent], (err, rows) => {
    if (err)
      throw err;
    else
      res.send(rows);
  });
  getAction('CREATED',(idaction)=>{
    connection.query("SELECT MAX(idnotes) as id from notes",(err, rows)=>{
    if(err) throw err
    else insertIntoHistory(rows[0].id, 0, defaultTitle,date_created,defaultLastMod,defaultContent, idaction);
  })})
  
}

exports.versionHistory = function versionHistory(id, res){
  connection.query("select t_n.idnotes,t_n.version,t_n.title,t_n.date_created,t_n.last_modified,t_n.content,t_a.action_type from notes_history t_n join action_types t_a on t_n.idaction=t_a.idaction WHERE t_n.idnotes = ?;", [id], (err, rows) => {
    if (err)
      throw err;
    else
      res.send(rows);
  });
}

function insertIntoHistory(id, version, title,date_created,last_modified,content, action) {
  connection.query("INSERT INTO	notes_history(idnotes,version, title, date_created, last_modified, content, idaction) VALUES (?,?,?,?,?,?,?)", [id, version, title,date_created, last_modified, content, action], (err, rows) => {
    if (err)
      throw err;
    else
      console.log("added to note history");
  });
}

function getAction(action, callback){
   connection.query("select idaction as id from action_types where action_type=?;",[action], (err, rows)=>{
     return callback(rows[0].id);
   })}


   //select from notes_history