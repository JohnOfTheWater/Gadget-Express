'use strict';

var Gadget = require('../models/gadget');
var Mongo = require('mongodb');

exports.create = function(req, res){
  var db = global.mdb;
  var gadgets = db.collection('gadgets');
  var gadget = new Gadget(req.body);
  gadgets.insert(gadget, function(err, records){
    res.send(records[0]);
  });
};

exports.index = function(req, res){
  var db = global.mdb;
  var gadgets = db.collection('gadgets');
  gadgets.find().toArray(function(err, records){
    res.send({gadgets:records});
  });
};
/*
exports.query = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');
  movies.find(req.query).toArray(function(err, records){
    res.send({movies:records});
  });
};
*/
exports.update = function(req, res){
  var db = global.mdb;
  var gadgets = db.collection('gadgets');

  var gadget = new Gadget(req.body);
  var id = Mongo.ObjectID(req.params.id);
  var query = {_id : id};

  gadgets.update(query, gadget, function(err, count){
    res.send({updated:count, id:req.params.id});
  });
};
/*
exports.delete = function(req, res){
  var db = req.app.locals.db;
  var movies = db.collection('movies');

  var id = Mongo.ObjectID(req.params.id);
  var query = {_id : id};

  movies.remove(query, function(err, count){
    res.send({deleted:count, id:req.params.id});
  });
};
*/
