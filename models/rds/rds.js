const pool = require('./pool');

const query_user_by_name = "SELECT * FROM users WHERE user_name = '";
const query_users_by_org = "SELECT * FROM users WHERE org_id = '";

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
                if (error || !rows[0]){
                    callback(error);
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
                if (error || !rows[0]){
                    callback(error);
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
            connection.query("UPDATE users SET user_name = '" + name + "', org_id = '" + org + "', last_class = '" + last + "', next_class = '" + next + "', auth_level = " + auth, function(error){
                if (error){
                    callback(error);
                }
            });
        }
    });
}