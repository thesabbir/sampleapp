angular.module('app.routes', ['ui.router'])
  .run(["$rootScope", "$state", "$stateParams", function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    return $rootScope.$stateParams = $stateParams;
  }])
  .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'tpl/app.html'
      })
      .state('products', {
        url: '/products',
        templateUrl: 'tpl/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
          products: ["$sailsSocket", function ($sailsSocket) {
            return $sailsSocket.get('/api/product').then(function (res) {
              return res.data;
            });
          }]
        }
      });
  }]);
