const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const userServiceRouter = require('./src/services/userService');
const authServiceRouter = require('./src/services/authService');
const {
    connectToDatabase
} = require('./src/configs/database');

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use(morgan((tokens, req, res) => JSON.stringify({
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: Number.parseFloat(tokens.status(req, res)),
    content_length: tokens.res(req, res, 'content-length'),
    response_time: Number.parseFloat(tokens['response-time'](req, res)),
    request_body: req.body
})));

app.use('/api/users', userServiceRouter);
app.use('/api/auth', authServiceRouter);

connectToDatabase()
    .then(() => {
        let port = process.env.SERVER_PORT || 4000
        app.listen(port, () => console.log(`SYSTEM UP AND RUNNING ON PORT ${port}!`))
    })
    .catch((err) => console.log(err));