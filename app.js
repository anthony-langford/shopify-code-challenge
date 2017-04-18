const express    = require('express');
const request    = require('request');
const app        = express();

let url = 'https://backend-challenge-fall-2017.herokuapp.com/orders.json';
let totalPages = null;
let currentPage = 1;
let availableCookies = 0;
let orders = [];
let unfulfilledOrders = [];

// Filters out fulfilled orders
function removeFulfilledOrders () {
  unfulfilledOrders = orders.filter((order) => {
    return order.fulfilled !== true;
  }).filter((order) => {
    return order.fulfilled !== true;
  })
  console.log('unfulfilled orders', unfulfilledOrders);
}


// Gets data from all pages
function getAllPaginatedData (uri, callback) {


    request({ uri: uri, json: true }, (error, response, body) => {


      console.log('error:', error); // Log the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Log the response status code if a response was received
      console.log('body:', body); // Log the body


      if (!error && response.statusCode === 200) {

        currentPage = body.pagination.current_page;

        if (currentPage === 1) { // Set total pages and available cookies on first page
          totalPages = body.pagination.total;
          availableCookies = body.available_cookies;
        }

        console.log('currentPage', currentPage);
        console.log('totalPages', totalPages);

        if (body.orders.length > 0) {  // Save orders if any on page
          orders = orders.concat(body.orders);
        }

      } else {
        new Error('Error: ', error);
      }

    if (currentPage === totalPages) { // Callback if last page
      callback;
    } else {
      currentPage ++;
      console.log('url', `${url}?page=${currentPage.toString()}`);
      getAllPaginatedData(`${url}?page=${currentPage.toString()}`);
    }
  })




}




app.get('/', (req, res) => {
  getAllPaginatedData(url, () => {
    console.log('Done!');                 // why isn't this running?
  });
  res.status(200).send('Hello!');
});





app.listen(8080, '0.0.0.0', () => {
    console.log('Listening to port: 8080');
});