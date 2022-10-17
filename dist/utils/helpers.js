"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomString = void 0;
const generateRandomString = function (length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
exports.generateRandomString = generateRandomString;
//# sourceMappingURL=helpers.js.map