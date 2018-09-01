const pool = require('./pool');

const query_user_by_name = "SELECT * FROM users WHERE user_name = '";
const query_users_by_org = "SELECT * FROM users WHERE org_id = '";
const query_classes_by_id = "SELECT * FROM classes WHERE class_id = '";
const query_classes_by_org = "SELECT * FROM classes WHERE org_id = '";

/**
 * Gets the user by name from the database.
 * @param {string} username The username to query
 * @param {function(error, user)} callback Used to return the 
 */
exports.getUserByName = function(username, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(query_user_by_name + username + "'", function(error, rows){
                if (error) {
                    callback(error);
                }
                else if (!rows[0]){
                    callback('No user found');
                }
                else {
                    callback(undefined, rows[0]);
                }
            });
        }
    });
}

exports.getUsersByOrg = function(org, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(query_users_by_org + org + "'", function(error, rows){
                if (error){
                    callback(error);
                }
                else if (!rows){
                    callback('No users found')
                }
                else {
                    callback(undefined, rows[0]);
                }
            });
        }
    });
}

exports.updateUser = function(id, name, org, last, next, auth, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query("UPDATE users SET user_name = '" + name + "', org_id = '" + org + 
            "', last_class = '" + last + "', next_class = '" + next + "', auth_level = " + auth, function(error){
                if (error){
                    callback(error);
                }
            });
        }
    });
}

exports.getFutureAssignments = function(orgId, date, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query("SELECT * FROM assignments WHERE org_id = " + orgId + "' AND date >= '" + date + 
            "' ORDER BY date ASC", function(error, rows){
                if (error){
                    callback(error);
                }
                else if (!rows){
                    callback('No assignments found');
                }
                else {
                    callback(undefined, rows);
                }
            })
        }
    });
}

exports.getPastAssignments = function(orgId, date, limit, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query("SELECT * FROM assignments WHERE org_id = " + orgId + "' AND date < '" + date + 
            "' ORDER BY date DESC LIMIT " + limit, function(error, rows){
                if (error){ 
                    callback(error);
                }
                else if (!rows){
                    callback('No assignments found');
                }
                else {
                    callback(undefined, rows);
                }
            })
        }
    });
}

exports.getClassesById = function(classId, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(query_classes_by_id + classId + "'", function(error, rows){
                if (error){
                    callback(error);
                }
                else if (!rows){
                    callback('No classes found');
                }
                else {
                    callback(undefined, rows);
                }
            });
        }
    });
}

exports.getClassesByOrg = function(orgId, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(query_classes_by_org + orgId + "'", function(error, rows){
                if (error){
                    callback(error);
                }
                else if (!rows){
                    callback('No classes found');
                }
                else {
                    callback(undefined, rows);
                }
            });
        }
    });
}