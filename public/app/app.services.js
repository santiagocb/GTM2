(function() {
  const server = "http://localhost:3001/gtm/"

  function serviceApp($http) {

    this.getUser = function() {
      return $http.get(server + "usuarios") //Es $http quien hace las llamadas AJAX al API
    }

    this.registrarse = function(data) {
      return $http.post(server + "signup", data) //Estructura de un POST en AngularJS
    }

    //establecer servicios de registrar, logeo
    this.getPublicaciones = function() {
      return $http.get(server + "publicacion")
    }

    this.crearPublicacion = function() {
      return $http.post(server + "publicacion", data)
    }

    this.modificarPerfil = function(data) {
      return $http.put(server + "perfil", data)
    };

    this.crearPublicacion = function(data) {
      console.log(data);
      var formData = new FormData();
      formData.append('nombre_producto', data.nombre_producto)
      formData.append('categoria', data.categoria)
      formData.append('descripcion', data.descripcion)
      formData.append('imagen', data.imagen)
      console.log(formData);
      var req = {
       method: 'POST',
       url: server + 'publicacion',
       headers: {
         'Content-Type': 'multipart/form-data'
       },
       data: formData,
       tranformRequest: function (data) {
         return data
       }

      }
      return $http(req)
    }

  }

  angular.module('app').service('serviceApp', ['$http', serviceApp])

  function usuarioService($scope){
    var user;
    this.set = function(data) {
      user = data
      console.log(user);
    }
    this.get = function() {
      return user;
    }
  }
  angular.module('app').service('usuarioService', [usuarioService])
})()
