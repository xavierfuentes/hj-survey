import Survey from './survey.model';

const mainController = {
  // Gets all Surveys in the collection and sends it back in JSON format
  getAllSurveys: (req, res) => {
    Survey.find({}, (err, surveys) => {
      if (err) return res.send(err);

      res.json(surveys);
    });
  },

  // Save a new Survey in the DB
  postNewSurvey: (req, res) => {
    // todo: validate the req and delete empty values
    const survey = req.body;

    Survey.create(survey, (err, survey) => {
      if (err) return res.send(err);

      res.json(true);
    });
  },
};

export default mainController;
