const express = require('express');
const authRouter = require('./src/services/userService');
const {connectToDatabase} = require('./src/configs/database')
const cors = require('cors')

const app = express();

app.use('/api/users', authRouter);
app.use(cors())

connectToDatabase()
.then(() => {
    app.listen(process.env.SERVER_PORT, () => console.log(`SYSTEM UP AND RUNNING ON PORT ${process.env.SERVER_PORT}!`))
})
.catch((err) => console.log(err))
