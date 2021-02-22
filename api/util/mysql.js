const mysql = require('mysql');

class simpleMysql{
    constructor(host,user,pass,db,port){
        this.host=host
        this.user=user
        this.pass=pass
        this.db=db
        this.port=port 
    }
     createConnection(){
        const connection=  mysql.createConnection({
            host: this.host,
            user: this.user,
            password:this.pass,
            database:this.db,
            port:this.port
        })
    
        return connection;
    }
    closeConnection(connection){
        try{
            connection.end()
        }
        catch(err){
            console.log("issue ending connection");
        }
    }
    
  
};
exports.simpleMysql = simpleMysql