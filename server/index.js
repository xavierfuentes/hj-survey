import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
// import path from 'path';

import mainController from './main.controller';

const app = express();

// Database config
mongoose.connect('mongodb://localhost:27017/survey');
mongoose.connection.on('error', () => {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

// App config
app.set('port', process.env.PORT || 5000);
app.use(logger('dev'));

// CORS
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST', 'PUT');
  next();
});

// Routes
app.get('/surveys', mainController.getAllSurveys);
app.put('/surveys', mainController.postNewSurvey);

// Start
app.listen(app.get('port'), () => {
  console.log(`App listening on port ${app.get('port')}!`);
});
