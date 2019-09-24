const db = require('../config/db')
const ObjectID =  require('mongodb').ObjectID;

module.exports = {
  getAll: (req, res)=> {
    db.get().collection('users').find().toArray((err, result)=> {
      if(err)throw err;
      res.send(result)
    })
  },

  getOneUser: (req, res) => {
    let id = req.params.id;
    let id_object = new ObjectID(id);
  
    db.get().collection('users').findOne({'_id' : id_object}, (error, result)=> {
      if(error) throw error;
      res.send(result);
    })
  },

  sortUser: (req, res) => {
    let sort = {name: 1};
  db.get().collection('users').find().sort(sort).toArray(function(err, result){
    if(err) throw err;
    res.send(result);
  })
  },

  createNew: (req, res) => {
    db.post().collection('users').insertOne(
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
  },

  deleteData: (req, res) => {
    let id = req.params.id;
  let id_object = new ObjectID(id);

  db.delete().collection('users').deleteOne({
    _id : id_object
  }, (err, result)=> {
    if(err)throw err;
    res.send(result)
  })
  },

  updateData:(req, res) => {
    let id = req.params.id;
  let id_object = new ObjectID(id);
  let username = req.body.name;
  let userumur = req.body.umur;
  let userrole = req.body.role;
  let useraddress = req.body.address;
  let useremail = req.body.email;

  db.put().collection('users').updateOne({
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
  }

}
