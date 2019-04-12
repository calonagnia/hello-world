//gawe koneksi
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: '35.202.88.139',
    port:'3306',
    user: 'calonagnia',
    password: '354bismillah354',
    database: 'DB1',
    debug: false,
    multipleStatements: true
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = connection;

