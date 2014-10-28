angular.module('app.products', [])
  .factory('ProductsApi', ["$sailsSocket", "$q", function ($sailsSocket, $q) {
    var factory = {};

    factory.subscribe = function (cb) {
      $sailsSocket.subscribe('product', function(message) {
        return cb(message);
      });
    };
    factory.getOne = function (id) {
      var deferred = $q.defer();
      $sailsSocket.get('/api/product/'+id).then(function (res) {
        deferred.resolve(res.data);
      });
      return deferred.promise;
    };
    factory.put = function (product) {
      $sailsSocket.put('/api/product/' + product.id, product).then(function (res) {
      });
    };
    factory.post = function (product) {
      $sailsSocket.post('/api/product', product).then(function (res) {
      });
    };
    factory.delete = function (product) {
      $sailsSocket.delete('/api/product/' + product.id).then(function (res) {
      })
    };

    return factory;
  }])
  .controller('ProductsCtrl', ["$scope", "$modal", "products", "ProductsApi", function ($scope, $modal, products, ProductsApi) {
    $scope.products = products;
    ProductsApi.subscribe(function(message) {
      console.log(message);
      switch (message.verb) {
        case "created":
              $scope.products.concat(message.data);
              break;
        case "updated":

        default:
          console.log("");
              break;
        $scope.apply();
      }

    });



    $scope.addNew = function () {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/products/modal_form.html',
        controller: 'ProductAddCtrl'

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
              function(product) {
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
      ProductsApi.post(product);
      $modalInstance.close('saved');
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
      $modalInstance.close('saved');
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])

  .controller("ProductDeleteCtrl", ["$scope", "$modalInstance", "product", "ProductsApi", function ($scope, $modalInstance, product, ProductsApi) {
    $scope.delete = function () {
      ProductsApi.delete(product);
      $modalInstance.close('deleted');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
