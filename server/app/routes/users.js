'use strict';

var User = require('../models/user');
var Mongo = require('mongodb');

exports.create = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');
  var user = new User(req.body);
  users.insert(user, function(err, records){
    res.send(records[0]);
  });
};

exports.index = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');
  users.find().toArray(function(err, records){
    res.send({users:records});
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
  console.log(req);
  console.log(req);
  var db = global.mdb;
  var users = db.collection('users');

  var user = new User(req.body);
  var id = Mongo.ObjectID(req.params.id);
  var query = {_id : id};

  users.update(query, user, function(err, count){
    res.send({updated:count, id:req.params.id});
  });
};

exports.delete = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');

  var id = Mongo.ObjectID(req.params.id);
  var query = {_id : id};

  users.remove(query, function(err, count){
    res.send({deleted:count, id:req.params.id});
  });
};

