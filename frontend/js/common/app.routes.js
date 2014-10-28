angular.module('app.routes', ['ui.router'])
  .run(function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    return $rootScope.$stateParams = $stateParams;
  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/main');

    $stateProvider
      .state('app', {
        url: '/main',
        templateUrl: 'tpl/app.html'
      })
      .state('app.products', {
        url:'/products',
        templateUrl: 'tpl/products/products.html',
        controller: 'ProductsCtrl'
      });
  });
