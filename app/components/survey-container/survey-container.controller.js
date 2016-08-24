class SurveyContainer {
  constructor($log, SurveyService) {
    this.$log = $log;
    this.SurveyService = SurveyService;
  }

  $onInit() {
    this.surveys = [];

    this.SurveyService
      .getSurveys()
      .then(surveys => {
        this.surveys = surveys;
      });
  }

  // getSurveys() {
  //   debugger;
  // }

  onSuccess(surveys) {
    this.surveys = surveys;
  }
}

SurveyContainer.$inject = ['$log', 'SurveyService'];

export default SurveyContainer;
