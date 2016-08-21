import angular from 'angular';
import surveyElementComponent from './survey-element.component';

const surveyElementModule = angular
  .module('survey.elmement', [])
  .component('surveyElement', surveyElementComponent);

export default surveyElementModule;
