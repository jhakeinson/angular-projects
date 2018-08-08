angular.module("LoginMod").controller("LoginCtrl", function($scope, $http, toastr) {
    console.log("Controller initialize...");

    $scope.runLogin = function() {
        $http.put("/login", {
            email: $scope.email,
            password: $scope.password
        }).then(function onSuccess() {
            window.location = "/dashboard";
        }, 
        function onError(err) {
            if(err.status == 404 || 400) {
                toastr.error("Invalid Credentials.", "Error", {claseButton: true});
            }
        });
    }
});
