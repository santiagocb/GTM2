(function() {
  const server = "http://localhost:3001/gtm/"

  function directiveApp($apply) {
    .directive('fileread', [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function (loadEvent) {
                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);
  }

  angular.module('app').directive('directiveApp', directiveApp)
})()
