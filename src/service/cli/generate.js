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
  ExitCode,
} = require(`../auxiliary/constants`);
const FILE_SENTENCES_PATH = `${__dirname}/../../../data/sentences.txt`;
const FILE_TITLES_PATH = `${__dirname}/../../../data/titles.txt`;
const FILE_CATEGORIES_PATH = `${__dirname}/../../../data/categories.txt`;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.split(`\n`)
      .filter((el) => el.length > 0);

  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const getRandomDate = () => {
  const getToday = () => new Date();
  const dateLowerLimit = new Date(getToday().setMonth(getToday().getMonth() - MONTHS_AGO_LIMIT));
  const multiplier = getToday().getTime() - dateLowerLimit.getTime();

  return new Date(dateLowerLimit.getTime() + Math.random() * multiplier);
};

const getRandomDescription = (sentences, maxLength, minLength = 1) => {
  const targetLength = getRandomInt(minLength, maxLength);

  return shuffle(sentences).slice(0, targetLength).join(` `);
};

const generateAds = (count, titles, categories, sentences) => {
  return Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(),
    announce: getRandomDescription(sentences, ANNOUNCE_LENGTH_LIMIT),
    fullText: getRandomDescription(sentences, sentences.length, ANNOUNCE_LENGTH_LIMIT),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length)),
  }));
};

const runGenerateAndSaveScenario = async (args) => {
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const titles = await readContent(FILE_TITLES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);

  const [count] = args;
  const adsCount = Number.parseInt(count, 10) || DEFAULT_COUNT;
  if (adsCount > MAX_ADS_COUNT) {
    console.error(chalk.red(`Не больше ${MAX_ADS_COUNT} объявлений`));
    process.exit(ExitCode.SUCCESS);
  }

  const content = JSON.stringify(generateAds(adsCount, titles, categories, sentences));
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
