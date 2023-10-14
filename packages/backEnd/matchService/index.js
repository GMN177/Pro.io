const express = require('express');
const cors = require('cors')
const logger = require('./src/middlewares/logMiddleware')
const gameRouter = require('./src/services/matchService');
const {connectToDatabase} = require('./src/configs/database')

const app = express();

app.use(cors({
    origin: '*'
}))

app.use(express.json());
app.use(logger)

app.use('/api/matches', gameRouter);

connectToDatabase()
  .then(() => {
    app.listen(process.env.SERVER_PORT, () =>
      console.log(`SYSTEM UP AND RUNNING ON PORT ${process.env.SERVER_PORT}!`)
    );
  })
  .catch((err) => console.log(err));