//connect mongo
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const {
  url,
  PORT
} = require('../envir')

const dbName = 'todos';

let db;

function connect(callback) {
  //connect mongoclient
  MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, function (err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    db = client;
    callback();
  });
}
function get() {
  return db.db(dbName)
}

function close() {
  db.close();
}
module.exports = {
  connect,
  get,
  close
};