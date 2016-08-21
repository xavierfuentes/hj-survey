import angular from 'angular';
import surveyFactory from '../../services/surveys.service';
import surveyContainerComponent from './survey-container.component';

const surveyModule = angular
  .module('survey.container', [])
  .factory('SurveyService', surveyFactory)
  .component('surveyContainer', surveyContainerComponent);

export default surveyModule;
