import angular from 'angular';
import surveyFactory from '../../services/surveys.service';
import surveyContainerComponent from './survey-container.component';
import surveyListModule from '../survey-list';

const surveyModule = angular
  .module('survey.container', [
    surveyListModule.name,
  ])
  .service('SurveyService', surveyFactory)
  .component('surveyContainer', surveyContainerComponent);

export default surveyModule;
