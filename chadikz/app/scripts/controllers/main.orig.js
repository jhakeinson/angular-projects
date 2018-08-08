
/**
 * @ngdoc function
 * @name chadikzApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the chadikzApp
 */
angular.module('chadikzApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$location', 'Pubnub', function($scope, $rootScope, $location, Pubnub) {
    var _ref;
    var pb = Pubnub.getInstance('defaultInstance');
    
    if(pb.pubnubInstance == null) {
      console.log(pb);
      return $location.path('/join');
    }
    
    $scope.controlChannel = '__controlChannel';
    $scope.channels = [];
    $scope.messages = [];

    // Publish Chat
    $scope.publish = function(){
    	if(!$scope.selectedChannel){
   			return;
   		}
   		pb.publish({
   			channel: $scope.selectedChannel,
   			message: {
   				text:$scope.newMessage,
   				user: $scope.data.username
   			}
   		});
   		return $scope.newMessage = '';
    }

    //Add channel
    $scope.createChannel = function() {
      console.log('Creating channel...');

      channel = $scope.newChannel;
      $scope.newChannel = '';

      pb.grant({
        channel: channel,
        read: true,
        write: true,
        manage: true,
        callback: function() {
          console.log('Channel ' + channel + ' is created.', arguments);
        },
        error: function(error) {
          console.log(error);
        }
      });

      pb.grant({
        channel: channel+'.pnpres',
        read: true,
        write: false,
        callback: function() {
          console.log('Channel ' + channel + ' is Present.', arguments);
        },
        error: function(error) {
          console.log(error);
        }
      });

      pb.grant({
        channel: $scope.controlChannel,
        read: true,
        write: true,
        manage: true,
        callback: function() {
          console.log('Channel ' + channel + ' is created.', arguments);
        },
        error: function(error) {
          console.log(error);
        }
      });

      pb.grant({
        channel: $scope.controlChannel+'.pnpres',
        read: true,
        write: false,
        callback: function() {
          console.log('Channel ' + channel + ' is Present.', arguments);
        },
        error: function(error) {
          console.log(error);
        }
      });

      pb.publish({
        channel: $scope.controlChannel,
        message: channel,
        publish_key: 'pub-c-7e71d12e-0243-4f0e-b7d5-9bfc4da9ca73',
        callback: function(m) {
          console.log(m);
        },
        error: function(error) {
          console.log(error);
        }
      });

      return setTimeout(function() {
        $scope.subscribe(channel);
        return $scope.showCreate = false;
      }, 100);

    };

    $scope.subscribe = function(channel) {
      var _ref;
      if(channel === $scope.selectedChannel) 
        return;
      if($scope.selectedChannel) {
        pb.unsubscribe({
          channel: $scope.selectedChannel
        });
      }

      $scope.selectedChannel = channel;
      $scope.messages = ['Welcome to ' + channel];
      
      pb.subscribe({
        channel: $scope.selectedChannel,
        triggerEvents: ['callback', 'presence', 'connect', 'reconnect', 'disconnect', 'error'],
        state: {
          'city': ((_ref = $rootScope.data) != null? _ref.city:void 0) || 'unknown'
        },
        connect: function() {
          return console.log('Connected to ' + $scope.selectedChannel);
        },
        error: function(error) {
          return console.log('ERROR: from subscribe: ' + error, arguments);
        }
      });
      
      $rootScope.$on(Pubnub.getPresenceEventNameFor($scope.selectedChannel), function(ngEvent, payload) {
        return $scope.$apply(function() {
          var newData, userData;
          userData = pb.ngPresenceData($scope.selectedChannel);
          newData = {};
          $scope.users = pb.map(pb.ngListPresence($scope.selectedChannel), function(x) {
            var newX;
            newX = x;
            if (x.replace) {
              newX = x.replace(/\w+__/, "");
            }
            if (x.uuid) {
              newX = x.uuid.replace(/\w+__/, "");
            }
            newData[newX] = userData[x] || {};
            return newX;
          });
          return $scope.userData = newData;
        });
      });

      pb.here_now({
        channel: $scope.selectedChannel
      });
        
      $rootScope.$on(Pubnub.getMessageEventNameFor($scope.selectedChannel), function(ngEvent, message, envelope, channel) {
        var msg;
        console.lpg(message);
        console.lpg(envelope);
        console.lpg(channel);
        msg = payload.message.user ? "[" + payload.message.user + "] " + payload.message.text : "[unknown] " + payload.message;
        return $scope.$apply(function() {
          return $scope.messages.unshift(msg);
        });
      });
        
      return pb.history({
        channel: $scope.selectedChannel,
        auth_key: $scope.authKey,
        count: 500
      });
    };


    // Subscribe to retrieve channels from "control channel"
    pb.subscribe({
      channel: $scope.controlChannel,
      triggerEvents: ['callback', 'presence', 'connect', 'reconnect', 'disconnect', 'error'],
      connect: function() {
        return console.log('Connected to ' + $scope.controlChannel);
      },
      error: function(error) {
        return console.log('ERROR: from subscribe: ' + error, arguments);
      }
    });
    
    
    // Register for channel creation message events
    $rootScope.$on(Pubnub.getMessageEventNameFor($scope.controlChannel), function(ngEvent, message, envelope, channel) {
      console.log(message);
      return $scope.$apply(function() {
        if ($scope.channels.indexOf(payload.message) < 0) {
          return $scope.channels.push(payload.message);
        }
      });
    });
    
    // Get a reasonable historical backlog of messages to populate the channels list
    pb.history({
      channel: $scope.controlChannel,
      count: 500
    });

    $scope.newChannel = "The Waiting Room";
    return $scope.createChannel();
  }]);
