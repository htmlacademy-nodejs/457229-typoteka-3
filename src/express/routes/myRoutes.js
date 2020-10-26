'use strict';

const {Router} = require(`express`);

const myRouter = new Router();

myRouter.get(`/`, (req, res) => res.render(`my`));
myRouter.get(`/comments`, (req, res) => res.render(`comments`));
myRouter.get(`/add`, (req, res) => res.render(`new-post`));

module.exports = myRouter;
