(function () {
  function signupController($scope, serviceApp, $state){
    $scope.registrarse = function() { //La función del botón
      serviceApp.registrarse($scope.user).then(function(data) {
        console.log(data);
        $state.go("homeini.signin")

      })
    }


  }
  angular.module('app').controller('signupController', signupController)
})()
