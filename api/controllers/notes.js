const mysqlConnection=require("../util/mysql").simpleMysql
const simpleMysql=new mysqlConnection(process.env.DB_HOST,process.env.DB_USER,process.env.DB_PASS,process.env.DATABASE,process.env.DB_PORT)
const connection = simpleMysql.createConnection();

exports.getNotes=function getNotes(res) {
    connection.query("SELECT * FROM notes", (err, rows) => {
      if (err)
        throw err;
      else
        res.send(rows);
  
    });
  }
  exports.editNote=function editNote(version, title, content, last_modified, id, res) {
    connection.query("UPDATE notes SET version=?, title=?, content=?, last_modified=? WHERE idnotes=?", [version, title, content, last_modified, id], (err, rows) => {
      if (err)
        throw err;
      else
        res.send(rows);
    });
  }
  
  exports.removeNote=function removeNote(id, res) {
    connection.query("DELETE FROM Notes where idnotes = ?", [id], (err, rows) => {
      if (err)
        throw err;
      else
        res.send(rows);
    });
  }
  
  exports.addNotes=function addNotes(res) {
    connection.query("INSERT INTO	Notes( version, title, date_created, last_modified, content) VALUES ( 0, 'NOTE', NOW(), NOW(), 'Note content goes here')", (err, rows) => {
      if (err)
        throw err;
  
      else
        res.send(rows);
    });
  }
  