import controller from './survey-element.controller';

const surveyListComponent = {
  bindings: {
    surveyData: '<surveyData',
  },
  template: `
    <pre>{{survey|json}}</pre>
  `,
  controller,
};

export default surveyListComponent;
