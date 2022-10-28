module.exports = {
  url: process.env.DB_URL || 'mongodb://localhost',
  name: process.env.DB_NAME || 'batnotes__db',
};
