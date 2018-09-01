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
            if (error){
                res.send(error.message);
            }
            else {
                res.send('User updated');
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

exports.insertUser = function(req, res){    
    let userId = req.body.user_id;
    let username = req.body.user_name;
    let orgId = req.body.org_id || "";
    let last = req.body.last_class || "";
    let next = req.body.next_class || "";
    let auth = req.body.auth_level || "";

    if (userId && username){
        model.insertUser(userId, username, orgId, last, next, auth, function(error){
            if (error){
                res.send(error.message);
            }
            else {
                res.send('User inserted');
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

exports.deleteUser = function(req, res){
    let userId = req.params.userId;

    if (userId){
        model.deleteUser(userId, function(error){
            if (error){
                res.send(error.message);
            }
            else {
                let response = {
                    success: true
                }

                res.send(JSON.stringify(response));
            }
        })
    }
    else {
        res.send('Malformed request');
    }
}

// Assignments ===============================================================

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

exports.getAssignmentsByDateClass = function(req, res){
    let orgId = req.params.orgId;
    let classId = req.params.classId;
    let date = req.params.date;

    if (orgId && classId && date){
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

exports.updateAssignment = function(req, res){
    let index = req.body.index;
    let date = req.body.date;
    let orgId = req.body.org_id;
    let classId = req.body.class_id;
    let teacherId = req.body.teacher_id;

    if (index && date && orgId && classId && teacherId){
        model.updateAssignment(index, date, orgId, classId, teacherId, function(error, rows){
            if (error){
                res.send(error.message);
            }
            else {
                res.send('Assignment Updated');
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

exports.insertAssignment = function(req, res){
    let index = req.body.index;
    let date = req.body.date;
    let orgId = req.body.org_id;
    let classId = req.body.class_id;
    let teacherId = req.body.teacher_id;

    if (index && date && orgId && classId && teacherId){
        model.insertAssignment(index, date, orgId, classId, teacherId, function(error, rows){
            if (error){
                res.send(error.message);
            }
            else {
                res.send('Assignment created');
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

exports.deleteAssignment = function(req, res){
    let index = req.params.index;

    if (index){
        model.deleteAssignment(index, function(error){
            if (error){
                res.send(error.message);
            }
            else {
                let response = {
                    success: true
                }

                res.send(JSON.stringify(response));
            }
        })
    }
    else {
        res.send('Malformed request');
    }
}

// Classes ========================================================================

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
                
                res.send(JSON.stringify(response));
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

exports.getClassesByOrg = function(req, res){
    let org = req.params.org;

    if (org){
        model.getClassesByOrg(org, function(error, rows){
            if (error){
                res.send(error.message);
            }
            else {
                let response = {
                    classes: rows
                }
                
                res.send(JSON.stringify(response));
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

exports.insertClass = function(req, res){
    let classId = req.body.class_id;
    let className = req.body.class_name;
    let orgId = req.body.org_id;

    if (classId && className && orgId){
        model.insertClass(classId, className, orgId, function(error){
            if (error){
                res.send(error.message);
            }
            else {
                let response = {
                    success: true
                }

                res.send(JSON.stringify(response));
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

exports.updateClass = function(req, res){
    let classId = req.body.class_id;
    let className = req.body.class_name;
    let org_id = req.body.org_id;

    if (classId && className && org_id){
        model.insertClass(classId, className, org_id, function(error){
            if (error){
                res.send(error.message);
            }
            else {
                let response = {
                    success: true
                }

                res.send(JSON.stringify(response));
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

exports.deleteClass = function(req, res){
    let classId = req.params.classId;

    if (classId){
        model.deleteClass(classId, function(error, response){
            if (error){
                res.send(error.message);
            }
            else {
                let response = {
                    success: true
                }

                res.send(JSON.stringify(response));
            }
        });
    }
    else {
        res.send('Malformed request');
    }
}

// Organizations =======================================================================================

exports.getOrgById = function(req, res){
    let orgId = req.params.orgId;

    if (orgId){
        model.getOrgById(orgId, (error, org) => sendResults(res, error, org));
    }
    else {
        res.send('Malformed request');
    }
}

exports.getOrgByName = function(req, res){
    let orgName = req.params.name;

    if (orgName){
        model.getOrgByName(orgName, (error, org) => sendResults(res, error, org));
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
        res.send(JSON.stringify(result));
    }
}