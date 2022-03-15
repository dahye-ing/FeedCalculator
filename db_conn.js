const mariadb = require('mariadb');
const config = require('./db_config.json');

let pool = mariadb.createPool(config);

function mariaConn(callback) {
  conn.getConnection(function (err, conn) {
    if(!err) {
      callback(conn);
    }
  });
}

module.exports = mariaConn;
