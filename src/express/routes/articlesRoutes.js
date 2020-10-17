'use strict';

const {Router} = require(`express`);
const sendReqUrl = require(`../middlewares/sendReqUrl`);

const articlesRouter = new Router();

articlesRouter.get(`/`, sendReqUrl);
articlesRouter.get(`/category/:id`, sendReqUrl);
articlesRouter.get(`/edit/:id`, sendReqUrl);
articlesRouter.get(`/:id`, sendReqUrl);

module.exports = articlesRouter;
