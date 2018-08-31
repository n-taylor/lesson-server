
/**
 * Handles requests to the home page
 * @param {*} req 
 * @param {*} res 
 */
exports.home = function(req, res){
    res.send('Congratulations! You have reached the home page for the lesson-scheduler server.');
}