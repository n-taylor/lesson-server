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

exports.getUser = function(req, res) {
    username = req.params.username;
    model.getUserByName(username, function(error, user){
        if (error){
            let response = {
                success: false
            }
            res.send(JSON.stringify(response));
        }
        else {
            res.send(user);
        }
    });
}