angular.module('app.products', [])

  .controller('ProductsCtrl', function ($scope, $sailsSocket, $modal) {
    $sailsSocket.get('/api/product').then(function (res) {

      $scope.products = res.data;
    });
    io.socket.on('product', function (data) {
      console.log(data);
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
      console.log(id);
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

  })
  .controller("ProductAddCtrl", function ($scope, $sailsSocket, $modalInstance) {
    $scope.save = function (product) {
      $sailsSocket.post('/api/product', product).then(function (res) {
        console.log(res);
        $modalInstance.close('saved');
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller("ProductEditCtrl", function ($scope, $sailsSocket, $modalInstance, product, mode) {
    $scope.product = product;
    $scope.mode = mode;
    $scope.save = function (product) {
      $sailsSocket.put('/api/product/' + product.id, product).then(function (res) {
        console.log(res);
        $modalInstance.close('saved');

      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller("ProductDeleteCtrl", function ($scope, $sailsSocket, $modalInstance, id) {
    $scope.delete = function (product) {
      $sailsSocket.delete('/api/product/' + id).then(function (res) {
        console.log(res);
        $modalInstance.close('deleted');
      })
    };


    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
