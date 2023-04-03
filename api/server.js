const express = require('express');
const cors = require('cors')
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const app = express()
const port = 8080
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  console.log("req recieved.")
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})