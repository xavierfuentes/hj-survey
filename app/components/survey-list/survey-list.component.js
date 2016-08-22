import controller from './survey-list.controller';

const surveyListComponent = {
  bindings: {
    surveys: '<surveys',
  },
  template: `
    <div>
      <survey-element ng-repeat="survey in $ctrl.surveys track by $index" survey-data="survey"></survey-element>
    </div>
  `,
  controller,
};

export default surveyListComponent;
