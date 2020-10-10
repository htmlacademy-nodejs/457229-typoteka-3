'use strict';

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
const fs = require(`fs`);

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

const runGenerateAndSaveScenario = (args) => {
  const [count] = args;
  const adsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
  if (adsCount > MAX_ADS_COUNT) {
    console.error(`Не больше ${MAX_ADS_COUNT} объявлений`);
    process.exit(ExitCode.SUCCESS);
  }

  const content = JSON.stringify(generateAds(adsCount));
  fs.writeFile(`mocks.json`, content, (err) => {
    if (err) {
      console.error(err);
      process.exit(ExitCode.ERROR);
    }
    console.info(`Operation success. File created.`);
    process.exit(ExitCode.SUCCESS);
  });
};

module.exports = {
  name: `--generate`,
  run(args) {
    runGenerateAndSaveScenario(args);
  }
};
