class SurveyElement {
  constructor($log) {
    this.$log = $log;
  }

  $onInit() {
    this.$log.debug('element');
  }
}

SurveyElement.$inject = ['$log'];

export default SurveyElement;
