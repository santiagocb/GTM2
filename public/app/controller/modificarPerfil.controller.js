(function() {
  function modificarPerfilController($scope, $state, serviceApp) {
    $scope.modificarPerfil = function() {
      serviceApp.modificarPerfil($scope.perfil).then(function(data) {
        console.log(data);
        $state.go("homelog")

      })
    }
  }

  angular.module('app').controller('modificarPerfilController', ['$scope', '$state', 'serviceApp', modificarPerfilController])
})()
