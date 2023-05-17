const { Command, Option } = require('commander');
const program = new Command();

program.addOption(
    new Option('-e, --env-name <string>', 'env name')
        .makeOptionMandatory(true)
        .env("NODE_ENV")
).parse().opts();

const { NODE_ENV } = process.env;

require('dotenv-expand').expand(require('dotenv').config({
    path: `./envs/.env.${NODE_ENV}`
}));

module.exports = {};
