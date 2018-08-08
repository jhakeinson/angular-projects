var app = angular.module("web", ["ngRoute"])

.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  
  $locationProvider.hashPrefix(""); // FIX: Remove exckanatio (!) after #.
  
  $routeProvider
  .when("/main", {
    templateUrl: "main.html",
    controller: "MainController"
  })

  .when("/services", {
    templateUrl: "services.html",
    controller: "ServicesController"
  })

  .when("/contact", {
    templateUrl: "contact.html",
    controller: "ContactController"
  })

  .when("/about", {
    templateUrl: " about.html",
    controller: "MainController"
  })

  .otherwise({redirectTo: '/main'});
}])

.controller("MainController", ["$scope", "$http", function ($scope, $http) {
  $http.get("services.json")
    .then(function (response) {
        $scope.services = response.data;
    });
}])

.controller("ServicesController", ["$scope", "$http", function ($scope, $http) {
  $http.get("services.json")
    .then(function (response) {
        $scope.services = response.data;
    });
}])

.controller("ContactController", ["$scope", "$http", function ($scope, $http) {
  $http.get("locations.json")
      .then(function (response) {
          $scope.locations = response.data;
      });
}]);
 