
var express = require('express');
var router = express.Router();
var pg =  require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'config'));

/* GET home page. */
router.get('/', function(req, res, next) { 
  res.sendFile(path.join(__dirname,'../', '../', 'public', 'views', 'index.html'));
});

/* CREATE CODE */
router.post('/api/v1/todos', function(req, res) { 
  var results = [];

  // Grab data from http request
  var data = {
    text: req.body.text,
    complete: false
  };

  // Get a postgress client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

    // SQL Query  > Insert Data
    client.query("INSERT INTO items(text, complete) values($1,$2)",[data.text, data.complete]);

    // SQL Query > Select Data
    var query  =  client.query("SELECT * FROM items ORDER BY id ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() { 
      client.end();
      return res.json(results);
    });

    // Handle errors
    if(err) {
      console.log(err);
    }
  });
});

/* READ CODE */
router.get('/api/v1/todos', function(req, res) {
  var results = [];

  // Get a Postgress client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // SQL Query > Select Data
    var query = client.query("SELECT * FROM items ORDER BY id ASC");

    // Stream results back into one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all results is returned close connection and return results
    query.on('end', function() { 
      client.end();
      return res.json(results);
    });

    // Handler Errors
    if(err) {
      console.log(err);
    }

  });
});

/* UPDATE CODE*/
router.put('/api/v1/todos/:todo_id', function(req, res) {
  var results = [];
  // Grab data from the URL parameters
  var id = req.params.todo_id;
  // Grab data from the http request
  var data = {
    text: req.body.text,
    complete: req.body.complete
  };

  // Get a postgress client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // SQL Query > Update Data
    client.query("UPDATE items SET text=($1), complete=($2), WHERE id=($3)", [data.text, data.complete, id]);

    // SQL  Query > Select Data
    var query = client.query("SELECT * FROM items ORDER BY id ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      client.end();
      return res.json(results);
    });

    // Handle errors
    if(err) {
      console.log();
    }

  });
});

/* DELETE CODE*/
router.delete('/api/v1/todos/:todo_id', function(req, res) { console.log("this is a delete action");
  var results = [];
  // Grab data from the URL parameters
  var id = req.params.todo_id;

  // Get a postgress client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
    // SQL Query > Delete Data
    client.query("DELETE FROM items WHERE id=($1)",[id]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM items ORDER BY id ASC");

    // Stream all results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    // After all data is returned, close connection and return results
    query.on('end', function() {
      client.end();
      return res.json(results);
    });

    // Handle Errors
    if(err) {
      console.log(err);
    }
  });
});

module.exports = router;
