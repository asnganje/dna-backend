const express = require('express')
const app = express()

const port = 3000;

const start = () => {
    try {
        app.listen(port, ()=> {
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log('Could not start server')
    }
}

start()