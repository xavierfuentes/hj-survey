class SurveyContainer {
  constructor($log) {
    this.$log = $log;
  }

  $onInit() {
    this.$log.debug('hey!');
  }
}

SurveyContainer.$inject = ['$log'];

export default SurveyContainer;
