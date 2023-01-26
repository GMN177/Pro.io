const express = require('express');
const authRouter = require('./src/services/userService');
const {connectToDatabase} = require('./src/configs/database')

message_Json = {
    message: "Welcome to Pro.io APIs",
    routes: [
        "/auth"
    ]
}

const app = express();

app.use('/api/users', authRouter);

app.listen(4000, () => {
    console.log(`SYSTEM UP AND RUNNING ON PORT 4000!`)
    connectToDatabase()
})