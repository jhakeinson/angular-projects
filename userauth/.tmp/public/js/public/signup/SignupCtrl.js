angular.module("SignupMod").controller("SignupCtrl", function($scope, $http) {
    console.log("Controller initialize...");

    $scope.runSignup = function() {
        $http.post("/signup", {
            name: $scope.name,
            email: $scope.email,
            password: $scope.password
        })
        .then(function onSuccess(response) {
            window.location = "/user";
        })
        .catch(function onError(err) {
            console.log("POST Failed: " + err);
        });
    }
});
