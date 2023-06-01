
// const moment = require('moment');
// const log = console.log;
// const path = require('path');
const _ = require('lodash');
const nanoid = require('nanoid');
class service {

    getCode() {
        return nanoid(12);
    }
}

module.exports = new service();
