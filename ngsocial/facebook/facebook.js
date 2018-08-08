'use strict';

angular.module('ngSocial.facebook', ['ngRoute', 'ngFacebook'])


.config( function( $facebookProvider ) {
    $facebookProvider.setAppId('1637552399646298');
})

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.run( function($rootScope) {
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
})

.controller('FacebookCtrl', function($scope, $facebook) {
    $scope.isLoggedIn = false;
    $scope.login = function () {
        FB.login(function () {
            refresh();
            $scope.isLoggedIn = true;
        }, 
        {scope: 'email,public_profile,user_posts,publish_actions,user_photos'});
    }

    $scope.logout = function () {
        $facebook.logout()
            .then( function () {
                refresh();
                $scope.isLoggedIn = false;
            });
    }

    function refresh() {
        $facebook.api("/me?fields=link,name,first_name,last_name,email,gender,locale")
            .then( function (response) {
                $scope.welcomeMessage = "Welcome " + response.name;
                $scope.userInfo = response;
                $facebook.api("/me/picture", {redirect: false}).then(function(response) {
                    $scope.picture = response.data.url;
                    $facebook.api("/me/permissions").then(function(response) {
                        $scope.permissions = response.data;
                        $facebook.api("/me/posts").then(function(response) {
                            $scope.posts = response.data;
                        });
                    });
                });
            }, 
            function(err) {
                $scope.welcomeMessage = "Please login...";
            });
    }

    function deletePerm() {
        $facebook.api("DELETE /2347817545233137/permissions");
    }

    $scope.postToTimeline = function() {
        
    }

    $scope.postToTimeline = function() {
        var body = this.body;
        console.log(body);
        $facebook.api("/me/feed", "post", {message: body}).then(function(response) {
            console.log(body + 'aaaaaaaaaaaaaa');
            refresh();
        });
    }

    refresh();
});
