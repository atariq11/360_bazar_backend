
const moment = require('moment');
const log = console.log;
const path = require('path');
const _ = require('lodash');
const nanoid = require('nanoid');
class service {

    constructor() {
        this.line = this.line.bind(this);
    }

    getCode() {
        return nanoid(10);
    }

    camelCase(payload) {
        const response = {}
        for (const key in payload) {
            response[_.camelCase(key)] = payload[key];
        }
        return response;
    }

    clone(payload) {
        return JSON.parse(JSON.stringify(payload));
    }

    isObject(a) {
        return (!!a) && (a.constructor === Object);
    }

    isArray(a) {
        return (!!a) && (a.constructor === Array);
    }

    mod(numA, numB) {
        return numA % numB == 0;
    }

    rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    roundRobinNum(num) {
        let i = 0;
        return () => {
            ++i;
            i = i > num ? 1 : i;
            return i % (1 + num)
        }
    }

    replaceGlobally(originalText, searchText, replaceText) {
        const regex = new RegExp(searchText, 'g');
        return originalText.replace(regex, replaceText);
    }

    convertFileName(str) {
        return (str || "").toLowerCase().replace(/ /g, "_").trim();
    }

    range(a, b, step) {
        var A = [];
        if (typeof a == 'number') {
            A[0] = a;
            step = step || 1;
            while (a + step <= b) {
                A[A.length] = a += step;
            }
        }
        else {
            var s = 'abcdefghijklmnopqrstuvwxyz';
            if (a === a.toUpperCase()) {
                b = b.toUpperCase();
                s = s.toUpperCase();
            }
            s = s.substring(s.indexOf(a), s.indexOf(b) + 1);
            A = s.split('');
        }
        return A;
    }

    getOtp() {
        return `${Math.floor(10000 + Math.random() * 90000)}`;
    }

    filterKeys(payload, value) {

        if (value) {

            let filteredValue = value;

            for (const key in payload.userDetails) {
                filteredValue = this.replaceGlobally(filteredValue, `<<${key}>>`, payload.userDetails[key]);
            }
            return filteredValue;
        }

        return null;
    }

    getTime(time) {
        return time ? time.format('YYYY-MM-DD HH:mm:ss') : moment().format('YYYY-MM-DD HH:mm:ss');
    }

    line(num = 2) {

        try {
            const e = new Error();
            const regex = /\((.*):(\d+):(\d+)\)$/
            const match = regex.exec(e.stack.split("\n")[num]);
            const filepath = match[1];
            const fileName = path.basename(filepath);
            const line = match[2];
            const column = match[3];
            return {
                filepath,
                fileName,
                line,
                column,
                str: `${this.getTime()} - ${fileName}:${line}:${column}`
            };
        } catch (error) {

            return {
                str: `${this.getTime()} - `
            }
        }

    }

}

module.exports = new service();
