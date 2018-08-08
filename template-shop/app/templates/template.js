angular.module("templateStore.templates", ["ngRoute"])

.config(["$routeProvider", function($routeProvider) {
    $routeProvider
        .when("/templates", {
            templateUrl: "templates/template.html",
            controller: "templateCtrl"
        })

        .when("/templates/:templateId", {
            templateUrl: "templates/template-details.html",
            controller: "templateDetailsCtrl"
        });
}])

.controller("templateCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("json/templates.json").success(function (data) {
        $scope.templates = data;
        console.log(data);
    });
}])

.controller("templateDetailsCtrl", ["$scope", '$http', "$routeParams", "$filter", function($scope, $http, $routeParams, $filter) {
    var templateId = $routeParams.templateId; // get templateid from url

    $http.get("json/templates.json").success(function (data) {
        // Filter response data to return onky the template with the desured ud.
        $scope.template = $filter("filter")(data, function(d) {
            return d.id == templateId;
        })[0];
        $scope.mainImage = $scope.template.images[0].name;
    });

    $scope.changeImage = function (image) {
        $scope.mainImage = image.name;
    }
}])

