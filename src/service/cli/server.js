'use strict';

const express = require(`express`);
const fs = require(`fs`).promises;
const {StatusCodes: HttpCode} = require(`http-status-codes`);
const DEFAULT_PORT = `3000`;
const FILENAME = `mocks.json`;
const {ERROR} = require(`../auxiliary/constants`);

const app = express();
app.use(express.json());

app.get(`/posts`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.json([]);
  }
});

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = {
  name: `--server`,
  async run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;
    try {
      app.listen(port);
      console.info(`Server started on port ${port}`);
    } catch (e) {
      process.exit(ERROR);
    }
  }
};
