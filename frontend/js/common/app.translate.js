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
  .controller('translateCtrl', function ($scope, $translate) {
    $scope.lang = { isopen: false };
    $scope.langs = {en: 'English', bn: 'Bengali'};
    $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
    $scope.setLang = function (langKey, $event) {
      $scope.selectLang = $scope.langs[langKey];
      $translate.use(langKey);
      $scope.lang.isopen = !$scope.lang.isopen;
    };
  });
