'use strict';

module.exports = function(user){
  this.name = user.name || '';
  this.balance = parseInt(user.balance || 0);
  this.products = user.products ? user.products.split(', ') : [];
  //this.image = user.image || 'fake image';
};

