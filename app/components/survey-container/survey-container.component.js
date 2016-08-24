import controller from './survey-container.controller';

const surveyContainerComponent = {
  template: '<survey-list surveys="$ctrl.surveys"></survey-list>',
  controller,
};

export default surveyContainerComponent;
