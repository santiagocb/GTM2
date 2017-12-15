(function () {
  function homeController($scope, serviceApp) {
    $scope.usuarios = {}
    $scope.traerUser = function () {

      serviceApp.getUser().then(function(data) {
          console.log(data);
          $scope.usuarios = data.data
      })
    }
  }
  angular.module('app').controller('homeController', homeController)
})()
