'use strict';

const {HELP_TEXT} = require(`../auxiliary/constants`);


module.exports = {
  name: `--help`,
  run() {
    console.info(HELP_TEXT);
  }
};
