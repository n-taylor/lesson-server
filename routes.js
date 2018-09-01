const main = require('./controllers/main');
const db = require('./controllers/db');

module.exports = function(app) {
    
    app.get('/', main.home);
    app.get('/connect', db.connectTest);

    app.get('/user/login/:username', db.getUser);
    app.get('/user/byOrg/:org', db.getUsersByOrg);
    app.post('/user/update', db.updateUser);
}