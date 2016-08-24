class SurveyList {
  constructor($log) {
    this.$log = $log;
  }

  $onChanges(changes) {
    if (changes.surveys) this.surveys = Object.assign({}, changes.surveys.currentValue);
  }

  $onInit() {
    this.$log.debug('list');
    this.selected = [];

    // this.query = {
    //   order: 'name',
    //   limit: 5,
    //   page: 1,
    // };
  }
}

SurveyList.$inject = ['$log'];

export default SurveyList;
