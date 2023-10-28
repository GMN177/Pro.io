require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require("./utils/logger");
const morganMiddleware = require("./middlewares/morgan.middleware");
const gameRouter = require('./services/gameService');
const db = require('./configs/database');

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use(morganMiddleware);

app.use('/api/games', gameRouter);

try {
    await db.connectToDatabase();

    await db.seedDatabase();

    let port = process.env.SERVER_PORT || 4000;

    app.listen(port, () => logger.info(`SYSTEM UP AND RUNNING ON PORT ${port}!`));
} catch (err) {
    logger.error(err.message);
}