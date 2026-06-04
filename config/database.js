const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'spk_ahp_pesantren'
});

module.exports = connection.promise();