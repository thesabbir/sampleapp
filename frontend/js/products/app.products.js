angular.module('app.products', [])

  .controller('ProductsCtrl', ["$scope", "$sailsSocket", "$modal", function ($scope, $sailsSocket, $modal) {
    io.socket.on('product', function (ms) {
      alert(ms.verb);
    });

    $sailsSocket.get('/api/product').then(function (res) {
      $scope.products = res.data;
    });

    $scope.addNew = function () {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/products/modal_form.html',
        controller: 'ProductAddCtrl'

      });
    };
    $scope.delete = function (id) {
      var modalInstance = $modal.open({
        templateUrl: 'tpl/products/modal_delete.html',
        controller: 'ProductDeleteCtrl',
        resolve: {
          id: function () {
            return id;
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
            return $sailsSocket.get('/api/product/' + id).then(function (res) {
              return res.data;
            });
          },
          mode: function () {
            return "Edit Mode";
          }
        }

      });
    };

  }])

  .controller("ProductAddCtrl", ["$scope", "$sailsSocket", "$modalInstance", function ($scope, $sailsSocket, $modalInstance) {
    $scope.save = function (product) {
      $sailsSocket.post('/api/product', product).then(function (res) {
        $modalInstance.close('saved');
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])

  .controller("ProductEditCtrl", ["$scope", "$sailsSocket", "$modalInstance", "product", "mode", function ($scope, $sailsSocket, $modalInstance, product, mode) {
    $scope.product = product;
    $scope.mode = mode;
    $scope.save = function (product) {
      $sailsSocket.put('/api/product/' + product.id, product).then(function (res) {
        $modalInstance.close('saved');

      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])

  .controller("ProductDeleteCtrl", ["$scope", "$sailsSocket", "$modalInstance", "id", function ($scope, $sailsSocket, $modalInstance, id) {
    $scope.delete = function (product) {
      $sailsSocket.delete('/api/product/' + id).then(function (res) {
        $modalInstance.close('deleted');
      })
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
