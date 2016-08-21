import angular from 'angular';
import surveyListComponent from './survey-list.component';

const surveyListModule = angular
  .module('survey.list', [])
  .component('surveyList', surveyListComponent);

export default surveyListModule;
