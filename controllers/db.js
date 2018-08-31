const model = require('../models/rds/rds');
const pool = require('../models/rds/pool');

exports.connectTest = function(req, res) {
    pool.getConnection(function(error, connection){
        if (error){
            res.send('Sorry, no connection made');
        }
        else {
            res.send('You connected!');
        }
    });
}