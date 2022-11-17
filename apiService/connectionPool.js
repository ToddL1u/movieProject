var mysql = require("mysql2");
var pool = mysql.createPool({
  host: "host.docker.internal",
  user: "root",
  password: "pass.123",
  database: "db",
  connectionLimit: 10,
});

var query = function (sql, options, callback) {
  // console.log(sql, options, callback);
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }
  pool.getConnection(function (err, conn) {
    if (err) {
      callback(err, null, null);
    } else {
      conn.query(sql, options, function (err, results, fields) {
        callback(err, results, fields);
      });
      conn.release();
    }
  });
};

module.exports = query;
