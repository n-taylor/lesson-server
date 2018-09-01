const main = require('./controllers/main');
const db = require('./controllers/db');

module.exports = function(app) {
    
    app.get('/', main.home);
    app.get('/connect', db.connectTest);

    app.get('/user/byName/:username', db.getUser);
    app.get('/user/byOrg/:org', db.getUsersByOrg);
    app.post('/user/update', db.updateUser);
    app.post('/user', db.insertUser);
    app.put('/user/:userId", ');

    app.post('/assignment/future', db.getFutureAssignments);
    app.post('/assignment/past', db.getPastAssignments);
    app.put('/assignment', db.updateAssignment);
    app.put('/assignment/:index', db.deleteAssignment);
    app.post('/assignment', db.insertAssignment);
    app.get('/assignment/:orgId/:classId/:date', db.getAssignmentsByDateClass);

    app.get('/class/byId/:classId', db.getClassesById);
    app.get('/class/byOrg/:org', db.getClassesByOrg);
    app.post('/class', db.insertClass);
    app.put('/class', db.updateClass);
    app.put('/class/:classId', db.deleteClass);

    app.get('/org/byName/:name', db.getOrgByName);
    app.get('/org/byId/:orgId', db.getOrgById);
}