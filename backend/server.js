require('dotenv').config({path: "./config.env"})
const express = require('express')
const auth = require('./routes/auth')
const private = require('./routes/private')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/error')
const cors = require('cors')

const app = express();

connectDB()

app.use(express.json());
app.use(cors());

app.use('/api/auth' ,auth)
app.use('/api/private' ,private)

// error Handler(should be last piece of middleware)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Serever is listening on port ${PORT}`))