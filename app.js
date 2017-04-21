const express = require('express');
const request = require('request');
const app     = express();


let url = 'https://backend-challenge-fall-2017.herokuapp.com/orders.json';
let totalPages = null;
let currentPage = 0;
let availableCookies = 0;
let orders = [];
let unfulfilledOrders = [];
let pendingOrders = [];


// Find object in array with given key and return index
Array.prototype.find = function(obj) {
  // Loop through array
  for (let i = 0, len = this.length; i < len; i++) {
    let ele = this[i];
    let match = true;
    // Check each object
    for (let x in obj) {
      if (ele[x] !== obj[x]) {
        match = false;
        break;
      }
    }
    // Did it match?
    if (match) {
      return i;
    }
  }
};

// Find any order with given key/value pair
function findWithAttr(array, key, value) {
  for (let i = 0; i < array.length; i++) {
    if(array[i][key] === value) {
      return i;
    }
  }
  return -1;
}




// Gets data from all pages
function getAllPaginatedData(uri, callback) {

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



// Filters out fulfilled orders
function removeFulfilledOrders() {
  unfulfilledOrders = orders.filter((order) => {
    return order.fulfilled !== true;
  })
}

// removeFulfilledOrders();
// console.log(unfulfilledOrders);



// Push all orders without cookies first
function pushOrdersWithoutCookies() {
  let sortingArray = [];
  for (let i = 0; i < unfulfilledOrders.length; i++) {
    if (findWithAttr(unfulfilledOrders[i].products, 'title', 'Cookie') === -1) {
        pendingOrders.push(unfulfilledOrders[i]);
        unfulfilledOrders.splice(i, 1);
    };
  }
}

// pushOrdersWithoutCookies();
// console.log('unfulfilledOrders', unfulfilledOrders);
// console.log('pendingOrders', pendingOrders);



function sortUnfulfilledOrdersByCookies() {
  unfulfilledOrders.sort((a, b) => {
    return b.products[b.products.find({ title: 'Cookie' })].amount - a.products[a.products.find({ title: 'Cookie' })].amount;
  })
}

// sortUnfulfilledOrdersByCookies();
// console.log('unfulfilledOrders', unfulfilledOrders);



function pushCookieOrders() {
  let indexesToRemove = [];
  for (let i = 0; i < unfulfilledOrders.length; i++) {
    let orderCookieCount = unfulfilledOrders[i].products[unfulfilledOrders[i].products.find({ title: 'Cookie' })].amount;
    if (orderCookieCount <= remainingCookies) {
      remainingCookies -= orderCookieCount;
      pendingOrders.push(unfulfilledOrders[i]);
      indexesToRemove.push(i);
    }
  }
  for (let i = indexesToRemove.length - 1; i >= 0; i--) { // Need to loop in reverse order to remove orders so index doesn't change every cycle
    unfulfilledOrders.splice(indexesToRemove[i], 1);
  }
}

// pushCookieOrders();
// console.log('unfulfilledOrders', unfulfilledOrders);
// console.log('pendingOrders', pendingOrders);



function sortById() {
  unfulfilledOrders.sort((a, b) => {
    return a.id - b.id;
  })
}

// sortById();
// console.log('unfulfilledOrders', unfulfilledOrders);



app.get('/', (req, res) => {
  getAllPaginatedData(url, () => {
    // removeFulfilledOrders();
    // pushOrdersWithoutCookies();
    // sortUnfulfilledOrdersByCookies();
    // pushCookieOrders();
    // console.log('unfulfilledOrders', unfulfilledOrders);
    // console.log('pendingOrders', pendingOrders);
    console.log('Done!');
  });
  res.status(200).send('Hello!');
});



app.listen(8080, '0.0.0.0', () => {
    console.log('Listening to port: 8080');
});