function appConfig($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}

appConfig.$inject = ['$httpProvider'];

export default appConfig;
