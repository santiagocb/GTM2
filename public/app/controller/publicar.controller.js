(function() {
  function publicarController($auth, $scope, $state, serviceApp) {
    $scope.crearPublicacion = function() {
      serviceApp.crearPublicacion($scope.publicacion).then(function(response) {
        var file = $scope.publicacion.imagen;
        //$http.defaults.headers.put['Content-Type'] = 'multipart/form-data';


        $state.go("homelog")

      })
    }, function (response) {
      console.log(response)
    }

  }

  angular.module('app').controller('publicarController', ['$auth', '$scope', '$state', 'serviceApp', publicarController])
})()
