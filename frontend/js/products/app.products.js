angular.module('app.products', [])

  .controller('ProductsCtrl', function ($scope, $sailsSocket) {
    $sailsSocket.get('/api/product').then(function (res) {
        $scope.products = res.data;
    });


  });
