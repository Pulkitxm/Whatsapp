const express = require('express');
const http = require('http');
const config = require('./utils/config');
const app = express();
const cors = require('cors');
const chatsRouter = require('./controllers/chats');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const socketServer = require('./chatserver');

mongoose.set('strictQuery', false);

logger.info('connecting to mongodb');

mongoose.connect(config.MONGODB_URI)
.then(() => {
    logger.info('connected to MongoDB');
})
.catch((error) => {
    logger.error('error connecting to MongoDB:', error.message);
});

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use('/', chatsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

const server = http.createServer(app);
// Integrate Socket.io server with Express app
socketServer(server);

module.exports = server;