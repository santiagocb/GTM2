(function () {
  function logueoController($auth, $scope, $state, serviceApp, $http){

        $scope.login = function () {
            $auth.login($scope.user).then(function (response) {
                $http.defaults.headers.common['authorization'] = "Bearer " + response.data.token;
                $state.go("homelog");
            }, function(response) {
              console.log(response.status);
                if (response.status === 401) {
                    toastr.success('You have successfully signed in!');
                    $scope.mensaje = "Usuario o contraseña incorrectos";
                } else {
                    $scope.mensaje = "Hubo un error";
                    toastr.error('Es posible que el usuario no exista, verifica que esté bien escrito');
                }
            });
        };

        $scope.logout = function () {
            serviceApp.logout().then(function () {
                $state.go("signin");
            }, function (status) {
            });
        };
      }
  angular.module('app').controller('logueoController', ['$auth', '$scope', '$state', 'serviceApp', '$http', logueoController]) //El segundo parámetro es la función que se ejecuta en app.service
})()
