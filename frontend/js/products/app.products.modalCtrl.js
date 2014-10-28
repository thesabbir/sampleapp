/*
 Modal Controllers For Products
 */
angular.module('app.products.modalCtrl', [])
  .controller("ProductAddCtrl", ["$scope", "$modalInstance", "ProductsApi", function ($scope, $modalInstance, ProductsApi) {
    $scope.save = function (product) {
      ProductsApi.post(product).then(function (res) {
        $modalInstance.close(res.data);
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])
  .controller("ProductEditCtrl", ["$scope", "$modalInstance", "product", "ProductsApi", function ($scope, $modalInstance, product, ProductsApi) {
    $scope.product = product;
    $scope.mode = "Edit Mode";
    $scope.save = function (product) {
      ProductsApi.put(product).then(function (product) {
        $modalInstance.close(product);
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])

  .controller("ProductDeleteCtrl", ["$scope", "$modalInstance", "product", "ProductsApi", function ($scope, $modalInstance, product, ProductsApi) {
    $scope.delete = function () {
      ProductsApi.delete(product).then(function (product) {
        $modalInstance.close(product);
      });
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
