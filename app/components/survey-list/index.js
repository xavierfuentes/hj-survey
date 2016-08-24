import angular from 'angular';
import ngMaterialTable from 'angular-material-data-table';
import surveyListComponent from './survey-list.component';

import 'angular-material-data-table/dist/md-data-table.min.css';

const surveyListModule = angular
  .module('survey.list', [
    ngMaterialTable,
  ])
  .component('surveyList', surveyListComponent);

export default surveyListModule;
