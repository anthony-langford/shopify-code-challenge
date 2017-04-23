const express = require('express');
const request = require('request');
const app     = express();


let url = 'https://backend-challenge-fall-2017.herokuapp.com/orders.json';
let totalPages = null;
let currentPage = 0;
let remainingCookies = 0;
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

      if (!err && res.statusCode === 200) {
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




function preparePromises(url) {
  let promises = [];
  return new Promise((resolve, reject) => {
    for (i = 1; i <= totalPages; i++) {
      let p = getPageData(`${url}?page=${i.toString()}`);
      promises.push(p);
    }
    console.log('promises array', promises);
    resolve(promises);                                                 // How to trigger this after all responses?¿?¿ˀˀˀˀˀ Promise.all([])?
    // Need to run a single Promise.all([]) with every getPageData() inside array
  })
}




// Filters out fulfilled orders
function removeFulfilledOrders() {
  console.log('Removing fulfilled orders');
  unfulfilledOrders = orders.filter((order) => {
    return order.fulfilled !== true;
  })
}

// removeFulfilledOrders();
// console.log(unfulfilledOrders);




// Push all orders without cookies first
function pushOrdersWithoutCookies() {
  console.log('Pushing orders without cookies');
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
  console.log('Sorting unfulfilled orders by cookies');
  unfulfilledOrders.sort((a, b) => {
    return b.products[b.products.find({ title: 'Cookie' })].amount - a.products[a.products.find({ title: 'Cookie' })].amount;
  })
}

// sortUnfulfilledOrdersByCookies();
// console.log('unfulfilledOrders', unfulfilledOrders);




function pushCookieOrders() {
  console.log('Pushing orders with cookies');
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




function sortById(arr) {
  console.log('Sorting by ID');
  arr.sort((a, b) => {
    return a.id - b.id;
  })
}

// sortById(unfulfilledOrders);
// console.log('unfulfilledOrders', unfulfilledOrders);




function stripToIds(arr) {
  let unfulfilled_orders = [];
  for (i = 0; i < unfulfilledOrders; i++) {
    unfulfilled_orders.push(unfulfilledOrders.id)
  }
}



app.get('/', (req, res) => {
  // Promise.all([getPages(url), getAllData(url)])
  // .then(() => {
  //   console.log('ORDERS', orders);
  //   res.json({
  //     'remaining_cookies': remainingCookies,
  //     'unfulfilled_orders': unfulfilledOrders
  //   })
  // })
  // .catch((err) => {
  //   new Error(err);
  // })

  getPages(url)
  .then(() => {
    preparePromises(url)
    .then((promises) => {
      Promise.all(promises)
      .then(() => {
        console.log('Sorting orders', orders);
        sortById(orders);
        console.log('Sorted orders', orders);
        removeFulfilledOrders();
        pushOrdersWithoutCookies();
        sortUnfulfilledOrdersByCookies();
        pushCookieOrders();
        sortById(unfulfilledOrders);
        let unfulfilled_orders = [];
        for (i = 0; i < unfulfilledOrders; i++) {
          unfulfilled_orders.push(unfulfilledOrders.id)
        }
        res.json({
          'remaining_cookies': remainingCookies,
          'unfulfilled_orders': unfulfilledOrders
        })
      })
    })
  })


});



app.listen(4444, '0.0.0.0', () => {
    console.log('Listening to port: 4444');
});