const moment = require('moment');
const { setTypeParser, builtins } = require('pg').types;
setTypeParser(builtins.DATE, val => val ? logTime("DATE", val).format('YYYY-MM-DD') : val);
setTypeParser(builtins.TIME, val => val ? logTime("TIME", val, "HH:mm:ss", true).format('HH:mm:ss') : val);
setTypeParser(builtins.TIMETZ, val => val ? logTime("TIMETZ", val, "HH:mm:ss", true).format('HH:mm:ss') : val);
setTypeParser(builtins.TIMESTAMP, val => val ? logTime("TIMESTAMP", val).format('YYYY-MM-DD HH:mm:ss') : val);
setTypeParser(builtins.TIMESTAMPTZ, val => val ? logTime("TIMESTAMPTZ", val).format('YYYY-MM-DD HH:mm:ss') : val);
setTypeParser(builtins.INT8, 'text', parseInt);

const logTime = (dateType, val) => {
    //try {
    //console.log(dateType, "==>", val);
    return moment(val)
    // } catch (error) {
    //     console.log("error ==> ", error.message);
    //     return null
    // }
}

function main(envName) {
    require('dotenv-expand').expand(require('dotenv').config({
        path: `./envs/.env.${envName}`
    }));

}

module.exports = main;
