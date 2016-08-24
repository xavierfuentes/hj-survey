import angular from 'angular';
import ngMaterial from 'angular-material';
import ngAnimate from 'angular-animate';
import RootComponent from './root.component';
import appConfig from './config';
import surveyContainerComponent from './components/survey-container';

import 'normalize.css';
import 'angular-material/angular-material.css';

const adminApp = angular.module('hjAdmin', [
  ngMaterial,
  ngAnimate,

  surveyContainerComponent.name,
])
  .config(appConfig)
  .component('root', RootComponent);

export default adminApp;
