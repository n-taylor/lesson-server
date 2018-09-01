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
    let username = req.params.username;
    model.getUserByName(username, (error, user) => sendResults(res, error, user));
}

exports.getUsersByOrg = function(req, res){
    let org = req.params.org;
    model.getUsersByOrg(org, (error, rows) => {
        if (error){
            res.send(error.message);
        }
        else {
            let response = {
                users: rows
            }
            res.send(JSON.stringify(response));
        }
    });
}

exports.updateUser = function(req, res){
    let userId = req.body.user_id;
    let username = req.body.user_name;
    let orgId = req.body.org_id || "";
    let last = req.body.last_class || "";
    let next = req.body.next_class || "";
    let auth = req.body.auth_level || "";

    if (userId && username){
        model.updateUser(userId, username, orgId, last, next, auth, function(error){
            res.send(error.message);w
        });
    }
    else {
        res.send('Malformed request');
    }
}

exports.getFutureAssignments = function(req, res){
    let date = req.body.date;
    let orgId = req.body.org_id;

    if (orgId && date){
        model.getFutureAssignments(orgId, date, function(error, rows){
            if (error){
                res.send(error.message);
            }
            else {
                let response = {
                    assignments: rows
                }
                res.send(JSON.stringify(response));
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

exports.getPastAssignments = function(req, res){
    let date = req.body.date;
    let orgId = req.body.org_id;
    let limit = req.body.limit;

    if (orgId && date){
        model.getPastAssignments(orgId, date, limit, function(error, rows){
            if (error){
                res.send(error.message);
            }
            else {
                let response = {
                    assignments: rows
                }
                res.send(JSON.stringify(response));
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

exports.getClassesById = function(req, res){
    let classId = req.params.classId;

    if (classId){
        model.getClassesById(classId, function(error, rows){
            if (error){
                res.send(error.message);
            }
            else {
                let response = {
                    classes: rows
                }
                
                res.send(response);
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

function sendResults (res, error, result) {
    if (error){
        res.send(error.message);
    }
    else {
        res.send(result);
    }
}