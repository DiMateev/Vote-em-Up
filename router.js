const passport = require('passport');

const Authentication = require('./controllers/authentication');
const Survey = require('./controllers/survey');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
  app.post('/api/user/signin', requireSignin, Authentication.signin);
  app.post('/api/user/signup', Authentication.signup);
  app.get('/api/user', requireAuth, Authentication.fetchSurveyList);
  app.post('/api/oauth', Authentication.authenticateWithProvider);

  app.post('/api/survey/new', requireAuth, Survey.createNew);
  app.get('/api/survey/user', requireAuth, Survey.fetchUserSurveys);
  app.get('/api/survey', Survey.fetchAllSurveys);
  app.get('/api/survey/:id', Survey.fetchSingleSurvey);
  app.delete('/api/survey/:id', requireAuth, Survey.deleteSurvey);
  app.patch('/api/survey/vote/:id', Survey.voteForOption);
  app.patch('/api/survey/newVote/:id', Survey.voteForNewOption);
  app.patch('/api/survey/addoption/:id', requireAuth, Survey.addOption);
}