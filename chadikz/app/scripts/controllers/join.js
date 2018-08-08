'use strict';

/**
 * @ngdoc function
 * @name chadikzApp.controller:JoinCtrl
 * @description
 * # JpinCtrl
 * Controller of the chadikzApp
 */
angular.module('chadikzApp')
  .controller('JoinCtrl', function ($scope, $rootScope, $location) {
    $scope.data = {
      username: 'user_' + Math.floor(Math.random() * 1000)
    };
    
    $scope.reg = function() {
      var _ref1, _ref2;
      $rootScope.data || ($rootScope.data = {});

      $rootScope.data.username =  (_ref1 = $scope.data) != null? _ref1.username:void 0;
      $rootScope.data.city = (_ref2 = $scope.data) != null? _ref2.city:void 0;
      $rootScope.data.uuid = Math.floor(Math.random() * 1000000) + "__" + $scope.data.username;
      console.log($rootScope);

      $location.path("/");
    };
  });
