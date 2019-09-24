const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./config/db')
const userRouter = require('./routes/user')
const app = express()


const port = process.env.PORT || 3000

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(userRouter);

app.get('/', (req, res) => res.send("hello bujang"))

db.connect(() => {
  app.listen(port, () => console.log(`udah masuk ke-port ${port} ya bujang!`))
})
