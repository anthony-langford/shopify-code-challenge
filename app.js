const express    = require('express');
const request    = require('request');
const app        = express();

let url = 'https://backend-challenge-fall-2017.herokuapp.com/orders.json';





// Gets data from all pages
function getAllPaginatedData (url, callback) {

  request({ uri: url, json: true }, (error, response, body) => {

    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.

    let totalPages = body.pagination.total;

    if (!error && response.statusCode === 200) { // Check for errors
      // do something with data
    }

    if (body.pagination.currentpage === body.pagination.total) { // Callback if last page
      callback();
    } else {
      getAllPaginatedData();
    }
  });

}




app.get('/', (req, res) => {
  getAllPaginatedData(url, () => {
    console.log('Done!');
  });
  res.status(200).send('Hello!');
});





app.listen(8080, '0.0.0.0', () => {
    console.log('Listening to port: 8080');
});