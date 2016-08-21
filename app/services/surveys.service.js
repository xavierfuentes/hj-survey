class SurveyService {
  constructor($resource) {
    this.$resource = $resource;
  }
}

SurveyService.$inject = ['$resource'];

export default SurveyService;
