const mysql = require("mysql")

const db = mysql.createConnection({
    host: 'localhost',
    user: 'omega1984',
    password: '1917',
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