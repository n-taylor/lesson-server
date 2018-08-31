const main = require('./controllers/main');
const db = require('./controllers/db');

module.exports = function(app) {
    
    app.get('/', main.home);
    app.get('/connect', db.connectTest);

}