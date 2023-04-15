const express = require('express');
const userServiceRouter = require('./src/services/userService');
const authServiceRouter =  require('./src/services/authService')
const {connectToDatabase} = require('./src/configs/database')


const app = express();

app.use('/api/users', userServiceRouter);
app.use('/api/auth', authServiceRouter)

connectToDatabase()
.then(() => {
    app.listen(process.env.SERVER_PORT, () => console.log(`SYSTEM UP AND RUNNING ON PORT ${process.env.SERVER_PORT}!`))
})
.catch((err) => console.log(err))
