angular.module('app.products', ['app.products.api', 'app.products.modalCtrl'])
  /*
   Products Controller
   Used modal instead of routing for learning purpose
   TODO: Lighter API Calls
   TODO: Stop Repeating

   */
  .controller('ProductsCtrl', ["$scope", "$modal", "ProductsApi", function ($scope, $modal, ProductsApi) {
    ProductsApi.getAll().then(function (products) {
      $scope.products = products;
    });

    ProductsApi.subscribe(function (message) {
      ProductsApi.getAll().then(function (products) {
        $scope.products = products;
      });
    });

    $scope.addNew = function () {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/products/modal_form.html',
        controller: 'ProductAddCtrl'

      });
      modalInstance.result.then(function (product) {
        ProductsApi.getAll().then(function (products) {
          $scope.products = products;
        });
      });

    };
    $scope.delete = function (product) {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/products/modal_delete.html',
        controller: 'ProductDeleteCtrl',
        resolve: {
          product: function () {
            return product;
          }
        }
      });
      modalInstance.result.then(function (product) {
        ProductsApi.getAll().then(function (products) {
          $scope.products = products;
        });
      });

    };

    $scope.edit = function (product) {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/products/modal_form.html',
        controller: 'ProductEditCtrl',
        resolve: {
          product: function () {
            return ProductsApi.getOne(product.id).then(function (products) {
              return products;
            });
          }
        }
      });

      modalInstance.result.then(function (product) {
        ProductsApi.getAll().then(function (products) {
          $scope.products = products;
        })
      });
    };
  }]);
