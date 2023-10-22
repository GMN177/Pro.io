require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require("./utils/logger");
const morganMiddleware = require("./middlewares/morgan.middleware");
const userServiceRouter = require('./services/userService');
const authServiceRouter = require('./services/authService');
const {
    connectToDatabase
} = require('./configs/database');

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use(morganMiddleware);

app.use('/api/users', userServiceRouter);
app.use('/api/auth', authServiceRouter);

connectToDatabase()
    .then(() => {
        let port = process.env.SERVER_PORT || 4000
        app.listen(port, () => logger.info(`SYSTEM UP AND RUNNING ON PORT ${port}!`))
    })
    .catch((err) => logger.error(err));