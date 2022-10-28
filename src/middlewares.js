const express = require('express');
const { getAuth } = require('firebase-admin/auth');
const cookieParser = require('cookie-parser');

const morganLogger = require('morgan');
const cors = require('cors');

module.exports = (app) => {
  console.log('installing middlewares')
  app.use(cors());

  app.use(morganLogger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use((req, res, next) => {
    const idToken = ((req.headers.authorization || '').split(' ')[1])
    if (!idToken) return res.status(401).send('unauthorized')

    getAuth()
      .verifyIdToken(idToken)
      .then((decodedToken) => {
        res.locals.currentUser = decodedToken;
        next();
      })
      .catch((error) => {
        res.status(401).send('unauthorized')
      });
  })
};
