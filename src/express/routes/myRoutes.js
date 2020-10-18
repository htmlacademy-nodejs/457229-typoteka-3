'use strict';

const {Router} = require(`express`);
const sendReqUrl = require(`../middlewares/sendReqUrl`);

const myRouter = new Router();

myRouter.get(`/`, sendReqUrl);
myRouter.get(`/comments`, sendReqUrl);

module.exports = myRouter;
