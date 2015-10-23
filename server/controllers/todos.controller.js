'use strict';
var path   = require('path');
var pg     =  require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

var todos = {
  create: function(req, res) {
    var results = [];
    var data = {
      text: req.body.text,
      complete: false
    };
    pg.connect(connectionString, function(err, client, done) {
      client.query("INSERT INTO items(text, complete) values($1,$2)",[data.text, data.complete]);
      var query  =  client.query("SELECT * FROM items ORDER BY id ASC");
      query.on('row', function(row) {
        results.push(row);
      });
      query.on('end', function() { 
        client.end();
        return res.json(results);
      });
      if(err) {
        console.log(err);
      }
    });
  },

  all: function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
      var query = client.query("SELECT * FROM items ORDER BY id ASC");
      query.on('row', function(row) {
        results.push(row);
      });

      query.on('end', function() { 
        client.end();
        return res.json(results);
      });
      if(err) {
        console.log(err);
      }
    });
  },
  
  update: function(req, res) {
    var results = [];
    var id = req.params.todo_id;
    var data = {
      text: req.body.text,
      complete: req.body.complete
    };
    pg.connect(connectionString, function(err, client, done) {
      client.query("UPDATE items SET text=($1), complete=($2), WHERE id=($3)", [data.text, data.complete, id]);

      var query = client.query("SELECT * FROM items ORDER BY id ASC");

      query.on('row', function(row) {
        results.push(row);
      });

      query.on('end', function() {
        client.end();
        return res.json(results);
      });

      if(err) {
        console.log();
      }
    });
  },

  delete: function(req, res) {
    var results = [];
    var id = req.params.todo_id;
    pg.connect(connectionString, function(err, client, done) {
      client.query("DELETE FROM items WHERE id=($1)",[id]);
      var query = client.query("SELECT * FROM items ORDER BY id ASC");
      query.on('row', function(row) {
        results.push(row);
      });
      query.on('end', function() {
        client.end();
        return res.json(results);
      });
      if(err) {
        console.log(err);
      }
    });
  }
};

module.exports = todos;