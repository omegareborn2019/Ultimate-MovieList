const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./database/index.js')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));


app.get('/api/movies', (req, res) =>{
  db.query('SELECT * FROM movie', (err, movie) =>{
    if (err){
      console.log(err);
      res.send(500);
    }else{
      res.send(movie);
    }
  })
})

app.post('/api/movies', (req, res) => {
  var sql = `INSERT INTO movie(movieName, release_date, IMDB, popularity)
  VALUES (?, ?, ?, ?)`

  db.query(sql, [req.body.movieName, req.body.release_date, req.body.IMDB, req.body.popularity], (err, data)=>{
    if (err) console.log(err);
    else{
      console.log(req.body);
      res.sendStatus(201);
    }
  })
})

// delete route goes here
app.delete('/api/movies', (req, res) => {
  console.log(req.body);
  db.query(`DELETE from movie WHERE movieName = ?`, [req.body.name], (err, data) =>{
    if(err){
      console.log(err);
    }else{
      res.sendStatus(204);
    }
  })
})

app.listen(PORT, () => {
  console.log(`${PORT} is connected`);
})