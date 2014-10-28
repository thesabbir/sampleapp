var App = angular.module('App', [
  'sails.io',
  'ngAnimate',
  'ui.bootstrap',
  'ui.jq',
  'ngCookies',
  'ngStorage',
  'app.configs',
  'app.products',
  'app.routes',
  'app.translate'
])
  .config(function ($sampleAppConfigProvider) {
    $sampleAppConfigProvider.setName('Sample App');
  }
)
  .controller('AppCtrl', function ($scope, $sampleAppConfig, $window) {

    $scope.app = $sampleAppConfig.getDefault();
  });
