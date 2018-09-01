const pool = require('./pool');

const query_user_by_name = "SELECT * FROM users WHERE user_name = '";
const query_users_by_org = "SELECT * FROM users WHERE org_id = '";
const query_classes_by_id = "SELECT * FROM classes WHERE class_id = '";
const query_classes_by_org = "SELECT * FROM classes WHERE org_id = '";
const insert_user = "INSERT INTO users (user_id, user_name, org_id, last_class, next_class, auth_level) VALUES (";
const query_org_by_id = "SELECT * FROM organizations WHERE org_id = '";
const query_org_by_name = "SELECT * FROM organizations WHERE org_name = '";

const insert_assignment = "INSERT INTO assignments (date, org_id, class_id, teacher_id) VALUES (";
const delete_assignment = "DELETE FROM assignments WHERE index = ";

const delete_user = "DELETE FROM users WHERE user_id = '";

const insert_class = "INSERT INTO classes (class_id, class_name, org_id) VALUES (";

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
            "', last_class = '" + last + "', next_class = '" + next + "', auth_level = " + auth + 
            " WHERE user_id = '" + id + "'", function(error){
                if (error){
                    callback(error);
                }
                else {
                    callback();
                }
            });
        }
    });
}

exports.insertUser = function(id, name, org, last, next, auth, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(`'${id}', '${name}', '${org}', '${last}', '${next}', ${auth})`, function(error){
                if (error){
                    callback(error);
                }
                else {
                    callback();
                }
            });
        }
    });
}

exports.deleteUser = function(userId, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(delete_user + userId + "'", function(error, response){
                if (error){
                    callback(error);
                }
                else {
                    callback();
                }
            });
        }
    });
}

// Assignments =====================================================================

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
            connection.query("SELECT * FROM assignments WHERE org_id = '" + orgId + "' AND date < '" + date + 
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

exports.getAssignmentByDateClass = function(orgId, classId, date, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(`SELECT * FROM assignments WHERE org_id = '${orgId}' AND class_id = '${classId}' ` +
            `AND date = '${date}'`, function(error, rows){
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

exports.updateAssignment = function(index, date, orgId, classId, teacherId, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(`UPDATE assignments SET date = '${date}', org_id = '${orgId}', ` + 
            `class_id = '${classId}', teacher_id = '${teacherId}' WHERE index = ${index}`, function(error, rows){
                if (error){
                    callback(error);
                }
                else {
                    callback();
                }
            });
        }
    });
}

exports.insertAssignment = function(index, date, orgId, classId, teacherId, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(insert_assignment + `'${date}', '${orgId}', '${classId}', '${teacherId}')`, 
            function(error, rows){
                if (error){
                    callback(error);
                }
                else {
                    callback();
                }
            });
        }
    });
}

exports.deleteAssignment = function(index, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(delete_assignment + index, function(error, rows){
                if (error){
                    callback(error);
                }
                else {
                    callback();
                }
            });
        }
    });
}

// Classes ======================================================================================

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

exports.insertClass = function (classId, className, orgId, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(insert_class + `'${classId}', '${class_name}', '${orgId}')`, function(error, rows){
                if (error){
                    callback(error);
                }
                else {
                    callback();
                }
            });
        }
    })
}

// Organizations ==============================================================

exports.getOrgById = function(orgId, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(query_org_by_id + orgId + "'", function(error, rows){
                if (error){
                    callback(error);
                }
                else if (!rows[0]){
                    callback('No organizations found');
                }
                else {
                    callback(undefined, rows[0]);
                }
            })
        }
    });
}

exports.getOrgByName = function(orgName, callback){
    pool.getConnection(function(error, connection){
        if (error){
            callback(error);
        }
        else {
            connection.query(query_org_by_name + orgName + "'", function(error, rows){
                if (error){
                    callback(error);
                }
                else if (!rows[0]){
                    callback('No organizations found');
                }
                else {
                    callback(undefined, rows[0]);
                }
            })
        }
    });
}