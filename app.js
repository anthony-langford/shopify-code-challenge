const express = require('express');
const request = require('request');
const app     = express();

const url = 'https://backend-challenge-fall-2017.herokuapp.com/orders.json';
let totalPages = null;
let currentPage = 0;
let remainingCookies = 0;
let orders = [];
let pendingOrders = [];
let unfulfilledOrders = [];
const unfulfilledOrderIds = [];

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

// Gets pagination data and remaining cookies
function getPages(uri) {
  totalPages = null;
  currentPage = 0;
  remainingCookies = 0;
  orders = [];
  unfulfilledOrders = [];
  pendingOrders = [];
  return new Promise((resolve, reject) => {
    request({ uri: uri, json: true }, (err, res, body) => {

      console.log('error:', err); // Log the error if one occurred
      console.log('statusCode:', res && res.statusCode); // Log the response status code if a response was received
      console.log('body:', body); // Log the body

      if (!err && res.statusCode === 200) { // Set total pages and remaining cookies if no error. What happens if body.pagination.total = undef? Need error handler
        totalPages = body.pagination.total;
        remainingCookies = body.available_cookies;
        console.log('totalPages', totalPages);
        console.log('remainingCookies', remainingCookies);
        resolve();
      } else {
        reject(Error(err));
      }

    });
  });
}

// Gets orders from page
function getPageData(uri) {
  return new Promise((resolve, reject) => {
    request({ uri: uri, json: true }, (err, res, body) => {
      console.log('PAGE', body.pagination.current_page);
      console.log('error:', err); // Log the error if one occurred
      console.log('statusCode:', res && res.statusCode); // Log the response status code if a response was received
      console.log('body:', body); // Log the body

      if (!err && res.statusCode === 200) {
        if (body.orders.length > 0) {  // Save orders if any on page
          orders = orders.concat(body.orders);
        }
        resolve();
      } else {
        reject(Error(err));
      }
    })
  })
}

// Creates array of async requests
function preparePromises(url) {
  let promises = [];
  for (i = 1; i <= totalPages; i++) {
    let getPage = getPageData(`${url}?page=${i.toString()}`);
    promises.push(getPage);
  }
  return promises;
}

// Filters out fulfilled orders
function removeFulfilledOrders() {
  unfulfilledOrders = orders.filter((order) => {
    return order.fulfilled !== true;
  });
}

// Push all orders without cookies first
function pushOrdersWithoutCookies() {
  console.log('Pushing orders without cookies');
  let sortingArray = [];
  for (let i = 0; i < unfulfilledOrders.length; i++) {
    if (findWithAttr(unfulfilledOrders[i].products, 'title', 'Cookie') === -1) {
      pendingOrders.push(unfulfilledOrders[i]);
      unfulfilledOrders.splice(i, 1);
    };
  };
}

// Sort orders by amount of cookies
function sortOrdersByCookies(arr) {
  arr.sort((a, b) => {
    return b.products[b.products.find({ title: 'Cookie' })].amount - a.products[a.products.find({ title: 'Cookie' })].amount;
  });
}

// Move orders with cookies from unfulfilled to pending if there's enough cookies left
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
  for (let i = indexesToRemove.length - 1; i >= 0; i--) {
    unfulfilledOrders.splice(indexesToRemove[i], 1);
  }
}

// Sort orders by IDs
function sortById(arr) {
  arr.sort((a, b) => {
    return a.id - b.id;
  })
}

// Creates array of order IDs
function getOrderIds(arr) {
  arr.forEach((order) => {
    unfulfilledOrderIds.push(order.id);
  });
}

app.get('/', (req, res) => {
  getPages(url).then(() => {
    Promise.all(preparePromises(url))
    .then(() => {
      sortById(orders);
      removeFulfilledOrders();
      pushOrdersWithoutCookies();
      sortOrdersByCookies(unfulfilledOrders);
      pushCookieOrders();
      sortById(unfulfilledOrders);
      getOrderIds(unfulfilledOrders);
      res.json({
        'remaining_cookies': remainingCookies,
        'unfulfilled_orders': unfulfilledOrderIds
      });
    })
    .catch((err) => {
      console.error("Error: ", err);
    })
  })
  .catch((err) => {
    console.error("Error: ", err);
  })
});

app.listen(4444, '0.0.0.0', () => {
    console.log('Listening to port: 4444');
});