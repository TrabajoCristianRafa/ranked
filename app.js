require('dotenv').config();

const app = require('express')();

require('./configs/express.config')(app);

const index = require('./routes/index.routes');
app.use('/', index);

require('./configs/error-handler')(app);

module.exports = app;
