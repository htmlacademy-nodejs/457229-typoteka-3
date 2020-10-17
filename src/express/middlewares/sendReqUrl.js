'use strict';

module.exports = (req, res, next) => {
  res.send(req.originalUrl);
  next();
};
