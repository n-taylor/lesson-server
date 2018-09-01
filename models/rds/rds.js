const pool = require('./pool');

const query_user_by_name = "SELECT * FROM users WHERE user_name = '";

/**
 * Gets the user by name from the database.
 * @param {string} username The username to query
 * @param {function(error, user)} callback Used to return the 
 */
exports.getUserByName = function(username, callback){
    pool.getConnection(function(error, connection){
        connection.query(query_user_by_name + username + "'", function(error, rows){
            if (error || !rows[0]){
                callback(error);
            }
            else {
                callback(undefined, rows[0]);
            }
        });
    });
}