const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const ObjectID =  require('mongodb').ObjectID;

//connect mongo
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//url
const url = 'mongodb://localhost:27017';
//dbname
const dbName = 'todos';
let db;


const app = express()
const port = process.env.PORT || 3000

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//connect mongoclient
MongoClient.connect(url,
  { useNewUrlParser: true ,useUnifiedTopology: true }, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
 
   db = client.db(dbName);

//  insertUser(db, () => {
//    console.log("user added");
//    client.close();
//  })
});

app.get('/', (req, res) => res.send("hello bujang"))

//create new user
app.post('/', (req, res) => {
  db.collection("users").insertOne(
    {
      //req.body on postman
      name: req.body.name, 
      umur: req.body.umur, 
      role: req.body.role,
      address: req.body.address,
      email: req.body.email
    },
    (err, result) => {
      try {
        res.send(result);
      } catch (error) {
        console.log(error);
        console.log(err)
      }
    }
    );
})
//get all data
app.get('/users', (req, res) => {
  db.collection("users").find().toArray((err, result)=> {
    if(err)throw err;
    res.send(result)
  })
})

//delete data
app.delete('/users/:id', (req, res)=> {
  let id = req.params.id;
  let id_object = new ObjectID(id);

  db.collection('users').deleteOne({
    _id : id_object
  }, (err, result)=> {
    if(err)throw err;
    res.send(result)
  })
})

//update data
app.put('/users/:id', (req, res)=> {
  let id = req.params.id;
  let id_object = new ObjectID(id);
  let username = req.body.name;
  let userumur = req.body.umur;
  let userrole = req.body.role;
  let useraddress = req.body.address;
  let useremail = req.body.email;

  db.collection('users').updateOne({
    "_id" : id_object
  }, {$set: {
    name: username,
    umur: userumur,
    role: userrole,
    address: useraddress,
    email: useremail
  }}, (err, result)=> {
    if(err) throw err;
    res.send(result);
  })
});


app.listen(port, () => console.log(`Listening on port ${port}!`))