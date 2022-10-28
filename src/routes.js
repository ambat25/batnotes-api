const express = require('express');

const router = express.Router();

router.use('/notes', require('./services/note/note.routes'));

module.exports = router;
