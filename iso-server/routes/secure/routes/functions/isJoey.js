function isJoey(id) {
    if ( id == "5e90cc96579a17440c5d7d52" ) {
        console.log('[Admin] Was Joey'.red);
        return true
    } else {
        console.log('[Admin] Was not Joey'.yellow);
        return false
    }
}

module.exports = 
    function (id) {
        if ( id == "5e90cc96579a17440c5d7d52" ) {
            console.log('[Admin] Was Joey'.red);
            return true
        } else {
            console.log('[Admin] Was not Joey'.yellow);
            return false
        }
    }
;