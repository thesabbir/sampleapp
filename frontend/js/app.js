var App = angular.module('App', [
  'sails.io',
  'ngAnimate',
  'ui.bootstrap',
  'ui.jq',
  'ngCookies',
  'ngStorage',
  'app.configs',
  'app.routes',
  'app.translate',
  'app.products'
])
  .config(["$sampleAppConfigProvider", function ($sampleAppConfigProvider) {
    $sampleAppConfigProvider.setName('Sample App');
  }]
)
  .controller('AppCtrl', ["$scope", "$sampleAppConfig", "$window", function ($scope, $sampleAppConfig, $window) {

    $scope.app = $sampleAppConfig.getDefault();
  }]);
