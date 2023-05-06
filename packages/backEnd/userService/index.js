const express = require('express');
const userServiceRouter = require('./src/services/userService');
const authServiceRouter =  require('./src/services/authService')
const {connectToDatabase} = require('./src/configs/database')
const cors = require('cors')   


const app = express();

app.use(cors())
app.use('/api/users', userServiceRouter);
app.use('/api/auth', authServiceRouter)

connectToDatabase()
.then(() => {
    let port = process.env.SERVER_PORT || 4000
    app.listen(port, () => console.log(`SYSTEM UP AND RUNNING ON PORT ${port}!`))
})
.catch((err) => console.log(err))
