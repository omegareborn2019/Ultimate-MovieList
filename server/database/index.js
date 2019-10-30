const mysql = require("mysql")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'movies'
})

db.connect((err) => {
    if (err){
        console.log(err);
        return;
    }else{
        console.log('connected to database')
    }
})

module.exports = db;