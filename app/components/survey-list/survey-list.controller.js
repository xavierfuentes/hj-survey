export default class SurveyList {
  /* @ngInject */
  constructor($log) {
    this.$log = $log;
  }

  $onInit() {
    this.$log.debug('hey!');
  }
}
