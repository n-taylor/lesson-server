const main = require('./controllers/main');
const db = require('./controllers/db');

module.exports = function(app) {
    
    app.get('/', main.home);
    app.get('/connect', db.connectTest);

    app.get('/user/login/:username', db.getUser);
    app.get('/user/byOrg/:org', db.getUsersByOrg);
    app.post('/user/update', db.updateUser);

    app.post('/assignment/future', db.getFutureAssignments);
    app.post('/assignment/past', db.getPastAssignments);

    app.get('/class/byId/:classId', db.getClassesById);
    app.get('/class/byOrg/:org', db.getClassesByOrg);
}