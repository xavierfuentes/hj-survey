class SurveyService {
  constructor($http) {
    this.$http = $http;
  }

  getSurveys() {
    return this.$http.get('http://localhost:5000/surveys')
      .then(response => response.data);
  }
}

SurveyService.$inject = ['$http'];

export default SurveyService;
