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
let pendingOrders = [];
let sortedOrders = [];
let unfulfilledOrders = [];

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

// Find any order with
function findWithAttr(array, attr, value) {
  for (let i = 0; i < array.length; i++) {
    if(array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}


// Filters out fulfilled orders
function removeFulfilledOrders() {
  pendingOrders = orders.filter((order) => {
    return order.fulfilled !== true;
  })
}

removeFulfilledOrders();
// console.log(pendingOrders);

// Push all orders without cookies first
let pushOrdersWithoutCookies = function() {
  let sortingArray = [];
  for (let i = 0; i < pendingOrders.length; i++) {
    if (findWithAttr(pendingOrders[i].products, 'title', 'Cookie') === -1) {
        sortedOrders.push(pendingOrders[i]);
        pendingOrders.splice(i, 1);
    };
  }
}

pushOrdersWithoutCookies();
// console.log('pendingOrders', pendingOrders);
// console.log('sortedOrders', sortedOrders);





  // pendingOrders.forEach((product) => {
    // if (product.title === 'Cookie') {
    //   pendingOrders.sort((a, b) => {
    //       return a - b;
    //   })
      // let orderSortingData = {
      //   id: order.id,
      //   index: orders.indexOf(order),
      //   cookies: product.amount
      // }
    //   sortingArray.push(orderSortingData);
    //   sortingArray.sort((a, b) => {
    //     return a.cookies - b.cookies;
    //   });
    // }
  // })

// sortCookieOrders();









// sortingArray.sort((a, b) => {
//   return a.cookies - b.cookies;
// });

// pendingOrders.forEach((order) => {
//   order.products.forEach((product) => {
//     if (product.title === 'Cookie') {
//       let orderSortingData = {
//         id: order.id,
//         index: orders.indexOf(order),
//         cookies: product.amount
//       }
//       sortingArray.push(orderSortingData);
//       sortingArray.sort((a, b) => {
//         return a.cookies - b.cookies;
//       });
//     }
//   })
// })

// console.log(pendingOrders);





// sort orders with highest cookies
  // if order has more than remaining cookies, then skip
  // if same amount of cookies, then prioritize lower id





















// removeFulfilledOrders();



// checkForCookies = [];

// orders.forEach((order) => {
//   checkForCookies.push(findWithAttr(order.products, 'title', 'Cookie'));
// })

// console.log(checkForCookies);

// for (let i = 0; i < checkForCookies.length; i++) {
//   if (checkForCookies[i] === -1) {
//     pendingOrders.splice(i, 1)
//   }
// }





























let sort1 = function(prop, arr) {
  prop = prop.split('.');
  let len = prop.length;

  arr.sort(function(a, b) {
    let i = 0;
    while (i < len) {
      a = a[prop[i]];
      b = b[prop[i]];
      i++;
    }

    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }

  });
  return arr;
};



// sort1()














function sort() {
  let sortingArray = [];
  let sortedOrders = [];
  pendingOrders.forEach((order) => {
    order.products.forEach((product) => {
      if (product.title === 'Cookie') {
        let orderSortingData = {
          id: order.id,
          index: orders.indexOf(order),
          cookies: product.amount
        }
        sortingArray.push(orderSortingData);
        sortingArray.sort((a, b) => {
          return a.cookies - b.cookies;
        });
      }
    })
  })
  sortingArray.forEach((obj) => {
    let index = obj.index;
    if (remainingCookies >= obj.cookies) {
      sortedOrders.push(orders[index]);
      remainingCookies -= obj.cookies;
      console.log(sortedOrders);
      console.log('remainingCookies', remainingCookies);
    } else {
      unfulfilledOrders.push(orders[index].id);
      console.log('unfulfilledOrders', unfulfilledOrders);
    }
  })

}

// sort();






// completedOrders = [1, 2, 3]
// pendingOrders = [5, 6, 10]
// unfulfilledOrders = []






