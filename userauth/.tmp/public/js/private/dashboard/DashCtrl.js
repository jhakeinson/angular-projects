angular.module("DashMod").controller("DashCtrl", function($scope, $http) {
    $scope.getUser = function() {
        console.log("Initialized...");

        $http.get("/getuser").then(function onSuccess(user) {
            console.log(user.data);
            $scope.user = user.data;
        },
        function onError(err) {
            console.log(err);
        });
    }
});
