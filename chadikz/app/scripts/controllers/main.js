
/**
 * @ngdoc function
 * @name chadikzApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chadikzApp
 */
angular.module('chadikzApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', '$timeout', function($scope, $rootScope, $location, $timeout) {
    var _ref;

    if($rootScope.data === undefined) {
      return $location.path('/join');
    }

    var CE = $rootScope.ChatEngine;

    $scope.messages = [];
    $scope.users = [];

    CE.connect($rootScope.data.uuid + '_' + String(new Date().getTime()), {
      username: $rootScope.data.username,
      city: $rootScope.data.city
    });

    CE.on('$.ready', (data) => {
      $scope.me = data.me;
      
      //Add channel
      $scope.createChannel = function() {
        console.log('Creating channel...');

        channel = $scope.newChannel;
        $scope.newChannel = '';

        return $timeout(function() {
          $scope.subscribe(channel);
          $scope.showCreate = false;
        }, 500);
      };

      $scope.subscribe = function(channel) {
        var _ref;
        console.log('Subscribing...');
        $scope.selectedChannel = channel;
        $scope.messages = ['Welcome to ' + channel];

        $rootScope.chat = new CE.Chat($scope.selectedChannel, false, false);
        $rootScope.chat.connect();

        $scope.users = $rootScope.chat.users;

        var search = $rootScope.chat.search({
          event:'message',
          limit: 50
        });

        //get chat history
        search.on('message', (payload) => {
          $scope.messages.unshift(payload.data.sentBy + ': ' + payload.data.text);
        });

        return listen();
      };

        $scope.publish = function() {
          $rootScope.chat.emit('message', {
              text: $scope.newMessage,
              sentBy: $rootScope.data.username
          });
          $scope.newMessage = '';
        }

        var listen = function() {
          $rootScope.chat.on('$.created.user', (data, user) => {
            console.log('User created');
            return $scope.users = $scope.chat.users;
          });
      
          $rootScope.chat.on('message', function(payload) {
            // render it in the DOM
            return $scope.messages.unshift(payload.data.sentBy + ': ' + payload.data.text);
          });

          CE.global.on('chat-list', function(payload) {
            console.log('PAYLOAD HERE: ', payload);
            return $rootScope.chats = payload.data;
          });
      
          $scope.ChatEngine.on('$.online.join', (payload) => {
            return $scope.users = $rootScope.chat.users;
          });
      
          $scope.ChatEngine.on('$.created.chat', (data, chat) => {
            console.log('Chat created');
            if ($rootScope.chats.indexOf($scope.selectedChannel) < 0) {
              console.log('Chat created: inside if');
              $rootScope.chats.unshift($scope.selectedChannel)
              CE.global.emit('chat-list', $rootScope.chats);
            }
          });
        }

        $scope.newChannel = "The Waiting Room";
        return $scope.createChannel();
    });

  }]);

