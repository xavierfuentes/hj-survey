import controller from './survey-container.controller';

const surveyContainerComponent = {
  template: `
    <div>
      <survey-list surveys="$ctrl.surveys"></survey-list>
    </div>
  `,
  controller,
};

export default surveyContainerComponent;
