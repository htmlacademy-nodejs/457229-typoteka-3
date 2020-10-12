'use strict';

const chalk = require(`chalk`);
const {HELP_TEXT} = require(`../auxiliary/constants`);

module.exports = {
  name: `--help`,
  run() {
    console.info(chalk.grey(HELP_TEXT));
  }
};
