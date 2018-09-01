const main = require('./controllers/main');
const db = require('./controllers/db');

module.exports = function(app) {
    
    app.get('/', main.home);
    app.get('/connect', db.connectTest);

    app.get('/user/byName/:username', db.getUser);
    app.get('/user/byOrg/:org', db.getUsersByOrg);
    app.post('/user/update', db.updateUser);
    app.post('/user', db.insertUser);

    app.post('/assignment/future', db.getFutureAssignments);
    app.post('/assignment/past', db.getPastAssignments);

    app.get('/class/byId/:classId', db.getClassesById);
    app.get('/class/byOrg/:org', db.getClassesByOrg);

    app.get('/org/byName/:name', db.getOrgByName);
    app.get('/org/byId/:orgId', db.getOrgById);
}