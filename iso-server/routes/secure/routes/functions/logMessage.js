var colors = require('colors');
const isJoey = require("./isJoey");

var logDateTime = false;
var logUser = false;

module.exports = 
    function (message) {
        console.log(`[Log] ${message}`.yellow);
    }
;