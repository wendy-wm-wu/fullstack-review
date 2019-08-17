const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
let app = express();
const fetchGithub = require('../helpers/github.js');
const database = require('../database/index.js');

//express.static is where your html page will be and that will be rendered onto your site
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  console.log(req.body.user);
  let user = req.body.user;

  fetchGithub.getReposByUsername(user, (err, response) => {
    if (err) {
      throw err;
    } else {
      console.log(response);
      let parsedResponse = JSON.parse(response.body);
      database.save(parsedResponse);
      res.sendStatus(201);
      };
    });
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  database.find((err, docs) => {
    if (err) {
      throw err;
    } else {
      res.send(docs);
    }
  })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

