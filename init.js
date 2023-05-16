function main(envName) {
    require('dotenv-expand').expand(require('dotenv').config({
        path: `./envs/.env.${envName}`
    }));

}

module.exports = main;
