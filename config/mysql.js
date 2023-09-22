const mysql      = require('mysql2');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'klarionic',
  password : 'root',
  database : 'express',
});


module.exports = connection