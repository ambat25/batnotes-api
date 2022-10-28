const router = require('express').Router();
const { getNotes, create, update } = require('./note.controller')

router.post('/', create);
router.put('/:id', update);
router.get('/', getNotes);

module.exports = router;
