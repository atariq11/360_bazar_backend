
const crypto = require('crypto');
const { escape } = require('lodash');
const md5 = require('md5');
const secretKey = md5(process.env.ENCRYPTION_SECRET || "K@si$3tel@bill");

class service {

    rc4Decode(encryptedText) {
        const secretKeyBuffer = Buffer.from(md5(secretKey), "hex");
        const decipher = crypto.createDecipheriv("rc4", secretKeyBuffer, '')
        const decrypted = decipher.update(encryptedText, "base64url", "utf8");
        return decrypted + decipher.final("utf8");
    }

    rc4Encode(decryptedText) {
        const secretKeyBuffer = Buffer.from(md5(secretKey), "hex");
        const cipher = crypto.createCipheriv("rc4", secretKeyBuffer, '')
        const encrypted = cipher.update(decryptedText, "utf8", "base64url");
        return encrypted + cipher.final("base64url");
    }
}

module.exports = new service();
