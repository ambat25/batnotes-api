const { BaseAuth,  } = require('firebase-admin/auth');

const mongoose = require('mongoose');
const { models } = require('../../utils/constants');
const logger = require('../../utils/logger');

const Users = mongoose.model(models.USER);


module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body;
      createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          res.send(user)
        })
        .catch((error) => {
          logger.error(error)
        });
    } catch (e) {
    }
  },
  async login(req, res) {
    const { email, password } = req.body;
    signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        return res.send(user);
      })
      .catch((error) => {
        logger.error(error)
      });
  },
  async logout(req, res) {
    signOut().then(() => {
      res.status(200).send('')
    }).catch((error) => {
      logger.error(error)
    });

  }
}