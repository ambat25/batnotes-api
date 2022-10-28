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
  app.use((_, res, next) => {
    var user = getAuth()?.currentUser;
    res.locals.currentUser = user;
    next();
  })
};
