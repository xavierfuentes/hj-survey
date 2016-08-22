import angular from 'angular';
import surveyListComponent from './survey-list.component';
import surveyElementModule from '../survey-element';

const surveyListModule = angular
  .module('survey.list', [
    surveyElementModule.name,
  ])
  .component('surveyList', surveyListComponent);

export default surveyListModule;
