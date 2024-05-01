require('dotenv').config()
const express = require("express")
const request = require("./Routes/requests")
const offer = require("./Routes/offers")
const connectDB = require('./Server/Config/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const app = express()
const PORT = process.env.PORT || 5000;


//Connect Database
connectDB()
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/requests",request)
app.use("/offers",offer)
app.use("/auth",require("./Routes/users"))
app.use('/uploads/avatars', express.static('uploads/avatars'))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.get('/',(req,res)=>{
    res.send("<h1>Backend Works !</h1>")
})