var MongoClient = require('mongodb').MongoClient

function getConnectionString(connection_string) {

//"mongodb://mobileapp:app123@ds151070.mlab.com:51070/frienddb"
  if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connection_string = 'mongodb://' + process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
      process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
      process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
      process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
      process.env.OPENSHIFT_APP_NAME;
  }
  return connection_string;
}

var connection;

var connect = function(connectionString, done) {
  if (connection) return done();
  var url = getConnectionString(connectionString);
  console.log(url);
  MongoClient.connect(url, function(err, db) {
    if (err){
      return done(err);
    }
    connection = db;
    done();
  })
}
var get = function() {
  return connection;
}
var close = function(done) {
  if (connection) {
    connection.close(function(err, result) {
      connection= null;
      done(err,result)
    })
  }
}
module.exports.connect = connect;
module.exports.get = get;
module.exports.close = close;
