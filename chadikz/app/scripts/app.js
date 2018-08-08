'use strict';

/**
 * @ngdoc overview
 * @name chadikzApp
 * @description
 * # chadikzApp
 *
 * Main module of the application.
 */
angular
  .module('chadikzApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'open-chat-framework'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/join/', {
        templateUrl: 'views/join.html',
        controller: 'JoinCtrl',
        controllerAs: 'join'
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'TestCtrl',
        controllerAs: 'test'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['$rootScope', 'ngChatEngine', function($rootScope, ngChatEngine) {

    $rootScope.ChatEngine = ChatEngineCore.create({
        publishKey: 'pub-c-d8599c43-cecf-42ba-a72f-aa3b24653c2b',
        subscribeKey: 'sub-c-6c6c021c-c4e2-11e7-9628-f616d8b03518'
    }, {
        debug: true,
        globalChannel: 'chadiz-app'
    });

    // bind open chat framework angular plugin
    ngChatEngine.bind($rootScope.ChatEngine);

    // set a global array of chatrooms
    $rootScope.chats = [];
}]);
