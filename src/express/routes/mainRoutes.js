'use strict';

const {Router} = require(`express`);
const sendReqUrl = require(`../middlewares/sendReqUrl`);

const mainRouter = new Router();

mainRouter.get(`/`, sendReqUrl);
mainRouter.get(`/login`, sendReqUrl);
mainRouter.get(`/register`, sendReqUrl);
mainRouter.get(`/search`, sendReqUrl);
mainRouter.get(`/categories`, sendReqUrl);

module.exports = mainRouter;
