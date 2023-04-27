const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index')
const errorMiddleware = require('./middleware/error-middleware')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT} and connected to database`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()