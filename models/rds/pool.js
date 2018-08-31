var mysql = require('mysql');

var pool = mysql.createPool({
    host: 'n-taylor-lesson-scheduler.cu1xy4oo6m8e.us-east-1.rds.amazonaws.com',
    user: 'ntaylor',
    password: '15McAllen17',
    database: 'dev_db',
    port: 3306,
    connectionLimit: 100
});

exports.pool = pool;

exports.getConnection = function(callback){
    pool.getConnection(callback);
}