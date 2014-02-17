'use strict';

module.exports = function(gadget){
  this.name = gadget.name || '';
  this.cost = parseInt(gadget.cost || 0);
  this.inStock = parseInt(gadget.inStock || 0);
};

