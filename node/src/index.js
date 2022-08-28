const express = require("express");
const db = require("mysql");
const { faker } = require('@faker-js/faker');


const server = express();

const databaseConfig = {
  host: 'db',
  user: 'root',
  password: 'tutstutsquerover',
  database: 'fc-node-nginx'
}

const cursor = db.createConnection(databaseConfig);

server.get('/', (req, res) => {
  const username = faker.name.firstName();
  console.log(username)

  try {
    cursor.query(`INSERT INTO people (name) VALUES ('${username}')`)

    cursor.query(`SELECT name FROM people`, (err, results, fields) => {
      res.send(`
      <h1>Full Cycle Rocks!</h1>
        <ol>
          ${results && !!results.length ? results.map(el => `<li>${el.name}</li>`).join('') : ''}
        </ol>
    `)
    })
  } catch (error) {
    res.send("Error on server")
  }
});

server.listen(3082, () => {
  console.log('Server PORT:', 3082);
})