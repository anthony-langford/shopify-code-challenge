let orders = [
{
    "id": 1,
    "fulfilled": true,
    "customer_email": "alex@interview.com",
    "products": [
      {
        "title": "Egg Tarte",
        "amount": 5,
        "unit_price\"": 27.5
      },
      {
        "title": "Cookie",
        "amount": 2,
        "unit_price": 14.5
      }
    ]
  },
  {
    "id": 2,
    "fulfilled": true,
    "customer_email": "gabriel@interview.com",
    "products": [
      {
        "title": "French Toast",
        "amount": 3,
        "unit_price\"": 4.5
      },
      {
        "title": "Cookie",
        "amount": 1,
        "unit_price": 14.5
      }
    ]
  },
  {
    "id": 3,
    "fulfilled": true,
    "customer_email": "ara@interview.com",
    "products": [
      {
        "title": "Apple Pie",
        "amount": 1,
        "unit_price\"": 6.5
      },
      {
        "title": "Mini Cupcake",
        "amount": 1,
        "unit_price": 2.5
      }
    ]
  },
  {
    "id": 4,
    "fulfilled": false,
    "customer_email": "pierre@interview.com",
    "products": [
      {
        "title": "Ice Cream",
        "amount": 1,
        "unit_price\"": 33.5
      },
      {
        "title": "Cake",
        "amount": 2,
        "unit_price": 8.5
      }
    ]
  },
  {
    "id": 5,
    "fulfilled": false,
    "customer_email": "alex@interview.com",
    "products": [
      {
        "title": "Pudding",
        "amount": 1,
        "unit_price\"": 100
      },
      {
        "title": "Cookie",
        "amount": 1,
        "unit_price": 14.5
      }
    ]
  },
  {
    "id": 6,
    "fulfilled": false,
    "customer_email": "david@interview.com",
    "products": [
      {
        "title": "Cupcake",
        "amount": 1,
        "unit_price\"": 46.55
      },
      {
        "title": "Cookie",
        "amount": 3,
        "unit_price": 14.5
      }
    ]
  },
  {
    "id": 7,
    "fulfilled": false,
    "customer_email": "stella@interview.com",
    "products": [
      {
        "title": "Brownie",
        "amount": 1,
        "unit_price\"": 75
      },
      {
        "title": "Cookie",
        "amount": 1,
        "unit_price": 14.5
      }
    ]
  },
  {
    "id": 8,
    "fulfilled": false,
    "customer_email": "stuart@interview.com",
    "products": [
      {
        "title": "Bread",
        "amount": 4,
        "unit_price\"": 22
      },
      {
        "title": "Cookie",
        "amount": 7,
        "unit_price": 14.5
      }
    ]
  },
  {
    "id": 9,
    "fulfilled": false,
    "customer_email": "gabriel@interview.com",
    "products": [
      {
        "title": "Chocolate Chip",
        "amount": 1,
        "unit_price\"": 9
      },
      {
        "title": "Cheesecake",
        "amount": 2,
        "unit_price": 12
      }
    ]
  },
  {
    "id": 10,
    "fulfilled": false,
    "customer_email": "hubert@interview.com",
    "products": [
      {
        "title": "Creme Brulee",
        "amount": 1,
        "unit_price\"": 99
      },
      {
        "title": "Cookie",
        "amount": 2,
        "unit_price": 14.5
      }
    ]
  },
  {
    "id": 11,
    "fulfilled": false,
    "customer_email": "julien@interview.com",
    "products": [
      {
        "title": "Carrot Cake",
        "amount": 1,
        "unit_price\"": 20.45
      },
      {
        "title": "Cookie",
        "amount": 1,
        "unit_price": 14.5
      }
    ]
  }
]


let remainingCookies = 6;
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


// Filters out fulfilled orders
function removeFulfilledOrders() {
  unfulfilledOrders = orders.filter((order) => {
    return order.fulfilled !== true;
  })
}

removeFulfilledOrders();
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

pushOrdersWithoutCookies();
// console.log('unfulfilledOrders', unfulfilledOrders);
// console.log('pendingOrders', pendingOrders);


function sortunfulfilledOrdersByCookies() {
  unfulfilledOrders.sort((a, b) => {
    return b.products[b.products.find({ title: 'Cookie' })].amount - a.products[a.products.find({ title: 'Cookie' })].amount;
  })
}

sortunfulfilledOrdersByCookies();
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


pushCookieOrders();
console.log('unfulfilledOrders', unfulfilledOrders);
console.log('pendingOrders', pendingOrders);


function sortById() {
  unfulfilledOrders.sort((a, b) => {
    return a.id - b.id;
  })
}

sortById();
console.log('unfulfilledOrders', unfulfilledOrders);









