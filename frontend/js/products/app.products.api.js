angular.module('app.products.api', [])
  .factory('ProductsApi', ["$sailsSocket", "$q", function ($sailsSocket, $q) {
    /* API WRAPPER FACTORY FOR PRODUCTS
     # Currently Using $sailsSocket instead of $http for ragtime updates
     # Heavily Used Promises
     */
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
      var deferred = $q.defer();
      $sailsSocket.put('/api/product/' + product.id, product).then(function (res) {
        deferred.resolve(res.data);

      });
      return deferred.promise;
    };
    factory.post = function (product) {
      var deferred = $q.defer();
      $sailsSocket.post('/api/product', product).then(function (res) {
        deferred.resolve(res.data);
      });
      return deferred.promise;
    };
    factory.delete = function (product) {
      var deferred = $q.defer();
      $sailsSocket.delete('/api/product/' + product.id).then(function (res) {
        deferred.resolve(res.data);
      });
      return deferred.promise;
    };

    return factory;
  }]);
