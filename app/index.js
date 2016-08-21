import angular from 'angular';
import RootComponent from './root.component';
import surveyContainerComponent from './components/survey-container';

angular.module('hjAdmin', [
  surveyContainerComponent.name,
])
  .component('root', RootComponent);
