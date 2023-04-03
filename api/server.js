const express = require('express');
const cors = require('cors')
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const app = express()
const port = 8080
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  // console.log("get recieved.")
  res.setHeader('Content-Type', 'application/json');
  knex
    .select('*')
    .from('movies')
    .then(data => res.status(200).send(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
})

app.post('/', (req, res) => {
  // console.log('post recieved')
  let movie = req.body
  knex.insert(movie)
    .into("movies")
    .then( data => res.status(200).send(data))
    .catch(err => res.status(404).json(err))
})

app.delete('/', (req, res) => {
  let id = req.body.id
  knex("movies").where("id", id)
    .del()
    .then(data => res.status(200).send(`Deleted movie with id: ${id}`))
    .catch(err => res.status(404).json(err))
})

app.patch('/', (req, res) => {
  let id = req.body.id
  knex("movies").where("id", id)
    .update({ watched: knex.raw('NOT ??',  ['watched']) })
    .then(data => res.status(200).send(`Updated watched status for movie with id: ${id}`))
    .catch(err => res.status(404).json(err))
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})