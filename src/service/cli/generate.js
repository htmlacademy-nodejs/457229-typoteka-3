'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {
  getRandomInt,
  shuffle,
} = require(`../auxiliary/utils`);
const {
  MAX_ADS_COUNT,
  ANNOUNCE_LENGTH_LIMIT,
  MONTHS_AGO_LIMIT,
  DEFAULT_COUNT,
  TITLES,
  SENTENCES,
  CATEGORIES,
  ExitCode,
} = require(`../auxiliary/constants`);

const getRandomDate = () => {
  const getToday = () => new Date();
  const dateLowerLimit = new Date(getToday().setMonth(getToday().getMonth() - MONTHS_AGO_LIMIT));
  const multiplier = getToday().getTime() - dateLowerLimit.getTime();

  return new Date(dateLowerLimit.getTime() + Math.random() * multiplier);
};

const getRandomDescription = (maxLength, minLength = 1) => {
  const targetLength = getRandomInt(minLength, maxLength);

  return shuffle(SENTENCES).slice(0, targetLength).join(` `);
};

const generateAds = (count) => {
  return Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getRandomDate(),
    announce: getRandomDescription(ANNOUNCE_LENGTH_LIMIT),
    fullText: getRandomDescription(SENTENCES.length, ANNOUNCE_LENGTH_LIMIT),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length)),
  }));
};

const runGenerateAndSaveScenario = async (args) => {
  const [count] = args;
  const adsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
  if (adsCount > MAX_ADS_COUNT) {
    console.error(chalk.red(`Не больше ${MAX_ADS_COUNT} объявлений`));
    process.exit(ExitCode.SUCCESS);
  }

  const content = JSON.stringify(generateAds(adsCount));
  try {
    await fs.writeFile(`${__dirname}/../../../mocks.json`, content);
    console.info(chalk.green(`Operation success. File created.`));
    process.exit(ExitCode.SUCCESS);
  } catch (err) {
    console.error(chalk.red(err));
    process.exit(ExitCode.ERROR);
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    await runGenerateAndSaveScenario(args);
  }
};
