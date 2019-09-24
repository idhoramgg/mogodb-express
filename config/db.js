//connect mongo
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbName = 'todos';
const {
  url,
  PORT
} = require('../envir')



let mongodb;

function connect(callback) {
  //connect mongoclient
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    mongodb = client;
    callback();
  });
}
function get() {
  return mongodb.db(dbName)
}

function close() {
  mongodb.close();
}
module.exports = {
  connect,
  get,
  close
};