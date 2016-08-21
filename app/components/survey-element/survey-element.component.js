import controller from './survey-element.controller';

const surveyListComponent = {
  template: `
    <div>
      {{survey.id}}
    </div>
  `,
  controller,
};

export default surveyListComponent;
