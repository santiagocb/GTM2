(function() {

  function getUsuario($scope, $state, serviceApp) {
    $scope.user = {}
    $scope.getUsuario = function () {

      serviceApp.getUsuario().then(function(data) {
          console.log(data);
          $scope.user = data.data
      })
    }
  }

  angular.module('app').controller('getUsuario', ['$scope', '$state', 'serviceApp', getUsuario])
})()
