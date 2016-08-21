import Survey from './survey.model';

const mainController = {
  // This gets all Surveys in the collection and sends it back in JSON format
  getAllSurveys: (req, res) => {
    Survey.find({}, (err, surveys) => {
      if (err) return res.send(err);

      res.json(surveys);
    });
  },

  postNewSurvey: (req, res) => {
    Survey.create({ answer: req.body.text, done: false });
  },
};

export default mainController;
