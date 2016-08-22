import angular from 'angular';
import RootComponent from './root.component';
import appConfig from './config';
import surveyContainerComponent from './components/survey-container';

angular.module('hjAdmin', [
  surveyContainerComponent.name,
])
  .config(appConfig)
  .component('root', RootComponent);
