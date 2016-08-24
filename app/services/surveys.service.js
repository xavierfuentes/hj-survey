class SurveyService {
  constructor($log, $http) {
    this.$log = $log;
    this.$http = $http;
  }

  getSurveys() {
    return this.$http.get('http://localhost:5000/surveys')
      .then(this.mapSurveys.bind(this))
      .catch(this.handleError.bind(this))
  }

  mapSurveys(response) {
    return response.data.map((_s) => {
      // todo: a projection from the BE should be used instead
      return Object.assign({}, {
        name: _s.name,
        email: _s.email,
        type: _s.type,
        address: _s.address,
        euresident: !!_s.euresident,
        book: _s.book,
        'business.name': _s.business.name,
        'business.size': _s.business.size,
        'color.red': !!_s.colors.red,
        'color.green': !!_s.colors.green,
        'color.blue': !!_s.colors.blue,
      });
    });
  }

  handleError(err) {
    this.$log.error(err);
  }
}

SurveyService.$inject = ['$log', '$http'];

export default SurveyService;
