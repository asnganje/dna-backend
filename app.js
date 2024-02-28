require('dotenv').config()
const express = require('express')
const app = express()
const userRoute = require('./server/routes/userRoutes')
const connectDB = require('./server/db/connect')

app.use(express.json())
app.use('/api/v1/dna', userRoute)

const port = process.env.PORT;
const url = process.env.MONGO_URI;


const start = async() => {
    try {
        await connectDB(url)
        app.listen(port, ()=> {
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log('Could not start server')
    }
}

start()