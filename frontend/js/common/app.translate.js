angular.module('app.translate', [
  'pascalprecht.translate'
]).config(['$translateProvider', function ($translateProvider) {
  $translateProvider.useStaticFilesLoader({
    prefix: 'locales/',
    suffix: '.json'
  });
  $translateProvider.preferredLanguage('en');
   $translateProvider.useLocalStorage();
}])
  .controller('translateCtrl', ["$scope", "$translate", function ($scope, $translate) {
    $scope.setLang = function (langKey) {
      $translate.use(langKey);
    };
  }]);
