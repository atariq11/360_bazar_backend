const { Command, Option } = require('commander');
const program = new Command();

const { envName } = program.addOption(
    new Option('-e, --env-name <string>', 'env name')
        .env("HAMZA")
        .makeOptionMandatory(true)
).parse(process.argv).opts();

console.log("envName", envName);
require('dotenv-expand').expand(require('dotenv').config({
    path: `./envs/.env.${envName}`
}));

module.exports = {};
