angular.module('app.products', [])
  .factory('ProductsApi', ["$sailsSocket", "$q", function ($sailsSocket, $q) {
    var factory = {};

    factory.subscribe = function (cb) {
      $sailsSocket.subscribe('product', function (message) {
        return cb(message);
      });
    };
    factory.getAll = function () {
      var deferred = $q.defer();
      $sailsSocket.get('/api/product').then(function (res) {
        deferred.resolve(res.data);
      });
      return deferred.promise;
    };
    factory.getOne = function (id) {
      var deferred = $q.defer();
      $sailsSocket.get('/api/product/' + id).then(function (res) {
        deferred.resolve(res.data);
      });
      return deferred.promise;
    };
    factory.put = function (product) {
      $sailsSocket.put('/api/product/' + product.id, product).then(function (res) {
      });
    };
    factory.post = function (product) {
      var deferred = $q.defer();

      $sailsSocket.post('/api/product', product).then(function (res) {
        deferred.resolve(res);

      });
      return deferred.promise;
    };
    factory.delete = function (product) {
      $sailsSocket.delete('/api/product/' + product.id).then(function (res) {
      })
    };

    return factory;
  }])
  .controller('ProductsCtrl', ["$scope", "$modal", "products", "ProductsApi", function ($scope, $modal, products, ProductsApi) {
    $scope.products = products;
    ProductsApi.subscribe(function (message) {
      console.log(message);
      if (message.verb == "created") {
        $scope.products = $scope.products.concat(message.data);
      }
      else {
        ProductsApi.getAll().then(function (products) {
          $scope.products = products;
        })
      }
    });


    $scope.addNew = function () {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/products/modal_form.html',
        controller: 'ProductAddCtrl'

      });
      modalInstance.result.then(function (product) {
        $scope.products = $scope.products.concat(product);
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
    };
    $scope.edit = function (id) {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/products/modal_form.html',
        controller: 'ProductEditCtrl',
        resolve: {
          product: function () {
            return ProductsApi.getOne(id).then(
              function (product) {
                return product;
              }
            );

          }
        }
      });
    };
  }])

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
      ProductsApi.put(product);
      $modalInstance.close(product);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])

  .controller("ProductDeleteCtrl", ["$scope", "$modalInstance", "product", "ProductsApi", function ($scope, $modalInstance, product, ProductsApi) {
    $scope.delete = function () {
      ProductsApi.delete(product);
      $modalInstance.close(product);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
