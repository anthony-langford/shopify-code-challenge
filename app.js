const express    = require('express');
const request    = require('request');
const bodyParser = require("body-parser");
const app        = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(8080, '0.0.0.0', () => {
    console.log('Listening to port: 8080');
});