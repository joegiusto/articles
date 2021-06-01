var colors = require('colors');

var logDateTime = false;
var logUser = true;

module.exports = 
    function (call, req) {
        console.log(`[LOG] Call to ${call}`.yellow);
        console.log(`[LOG][USER]${req.user._id}`.yellow)

        if (req?.user?._id && logUser) {
            console.group();
            console.log(`[LOG][USER]${req.user._id}`.yellow);
            console.groupEnd();
        }
    }
;