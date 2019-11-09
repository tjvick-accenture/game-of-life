const express = require('express');
const path = require('path');
const step = require('./../dist/game').step;
const bodyParser = require('body-parser');

const app = express();

const port = 3030;

app.get('/', (req, res) => res.sendFile(path.join(__dirname + "/app/index.html")));
app.get('/style.css', (req, res) => res.sendFile(path.join(__dirname + "/app/style.css")));
app.post('/step', bodyParser.json(), (req, res) => {
    res.send(step(req.body))
});

app.listen(port, () => console.log(`App listening on port ${port}`));
