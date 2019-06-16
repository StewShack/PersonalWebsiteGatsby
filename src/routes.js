const path = require('path');
module.exports = [
  {
    path: '/',
    component: path.resolve(`src/containers/Home.jsx`)
  },
  {
    path: '/order',
    component: path.resolve(`src/containers/Order.jsx`)
  },
  {
    path: '/404/',
    component: path.resolve(`src/containers/404.js`)
  }
];