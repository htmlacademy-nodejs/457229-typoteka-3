'use strict';

const express = require(`express`);
const myRouter = require(`./routes/myRoutes`);
const articlesRouter = require(`./routes/articlesRoutes`);
const mainRouter = require(`./routes/mainRoutes`);

const app = express();
const PORT = 8000;


app.use(`/articles`, articlesRouter);
app.use(`/my`, myRouter);
app.use(`/`, mainRouter);

app.listen(PORT);
