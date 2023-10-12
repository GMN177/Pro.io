const express = require('express');
const gameRouter = require('./src/services/matchService');
const {connectToDatabase} = require('./src/configs/database')
const cors = require('cors')

const app = express();

app.use(cors({
    origin: '*'
}))

app.use('/api/matches', gameRouter);

connectToDatabase()
  .then(() => {
    app.listen(process.env.SERVER_PORT, () =>
      console.log(`SYSTEM UP AND RUNNING ON PORT ${process.env.SERVER_PORT}!`)
    );
  })
  .catch((err) => console.log(err));