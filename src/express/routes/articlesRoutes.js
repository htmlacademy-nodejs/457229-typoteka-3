'use strict';

const {Router} = require(`express`);

const articlesRouter = new Router();

articlesRouter.get(`/`, (req, res) => res.render(`articles-by-category`));
articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles-by-category`));
articlesRouter.get(`/edit/:id`, (req, res) => res.render(`new-post`));
articlesRouter.get(`/:id`, (req, res) => res.render(`post`));

module.exports = articlesRouter;
