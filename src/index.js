const express = require('express');
const logger = require('./utils/logger');
const port = process.env.PORT || 3434;
const { connectDB, models } = require('./models');
const firebaseInitializer = require('./utils/firebaseConfig');

const app = express();
connectDB();
firebaseInitializer()
require('./middlewares')(app)
app.use('/', require('./routes'));

app.listen(port, () => {
  logger.info(`🚀 Server ready at http://localhost:${port}`);
})