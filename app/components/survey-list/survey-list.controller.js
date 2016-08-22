class SurveyList {
  constructor($log) {
    this.$log = $log;
  }

  $onInit() {
    this.$log.debug('list');
  }
}

SurveyList.$inject = ['$log'];

export default SurveyList;
