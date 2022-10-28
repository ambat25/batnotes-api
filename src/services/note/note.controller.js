const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const { models } = require('../../utils/constants');
const logger = require('../../utils/logger');

const Notes = mongoose.model(models.NOTES);

const defaultContent = JSON.stringify([{
  type: 'paragraph',
  children: [{ text: '' }],
}])
module.exports = {
  async create(req, res) {
    try {
      const newNote = await Notes({
        title: req.body.title,
        userId: res.locals.currentUser.uid,
        content: defaultContent
      });
      await newNote.save();
      return res.status(StatusCodes.CREATED).send(newNote);
    } catch (error) {
      logger.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error?.errors?.[0]?.message || error.message);
    }
  },
  async update(req, res) {
    try {
      const newNote = await Notes.findOneAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id), userId: res.locals.currentUser.uid, },
        {
          $set:{
            title: req.body.title,
            content: req.body.content
          }
        }, {new: true})

      return res.status(StatusCodes.CREATED).send(newNote);
    } catch (error) {
      logger.error(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error?.errors?.[0]?.message || error.message);
    }
  },
  async getNotes(req, res) {
    try {
      const limit = req.query['limit'] || 100;
      const page = req.query['page'] || 1;
      const skip = (page - 1) * limit;
      const total = await Notes.count({});
      const notes = await Notes.find({ userId: res.locals.currentUser.uid }).sort('-createdAt').skip(skip).limit(limit).lean();
      return res.status(StatusCodes.OK).send({ data: notes, page, total });
    } catch (e) {
      logger.error(e);
      return res.status(e?.status || StatusCodes.INTERNAL_SERVER_ERROR).send(e.message || 'Internal server error');
    }
  },
}