
const express = require('express')
const route = express.Router()

const {
  getAll,
  getOneUser,
  sortUser,
  createNew,
  deleteData,
  updateData,
} = require('../controller/user')



route.get('/users/alpha', sortUser)
route.post('/', createNew)
route.get('/users', getAll)
route.get('/users/:id', getOneUser)
route.delete('/users/:id', deleteData)
route.put('/users/:id', updateData)

module.exports = route;
