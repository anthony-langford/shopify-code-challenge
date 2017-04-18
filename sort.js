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


function sort (prop, arr) {
  prop = prop.split('.');
  let len = prop.length;

  arr.sort((a, b) => {
      let i = 0;
      while(i < len) {
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




let unfulfilledOrders = [];

function removeFulfilledOrders () {
  unfulfilledOrders = orders.filter((order) => {
    return order.fulfilled == false;
  })
  console.log('unfulfilled orders', unfulfilledOrders);
}


function checkOrdersForCookies () {
  unfulfilledOrders = orders.filter((order) => {
    if (order.products.find({ title: 'Cookie' }) == 1) {
      return order;
    }
  })
  console.log('unfulfilled orders', unfulfilledOrders);
}


checkOrdersForCookies();




function checkForCookies (array, searchFor, property) {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[i].hasOwnProperty(property)) {
      if (array[property] > 0) {
        return
      }
    }
  }
}




// console.log(orders.find({ products: [{ cookies: 1 }] }));





// console.log(sort("amount", orders));






















