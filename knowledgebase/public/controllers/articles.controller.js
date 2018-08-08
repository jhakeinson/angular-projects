angular.module("kbApp")

.controller("ArticlesCtrl", ["$scope", "$http", function($scope, $http) {
    $http.get("/articles").then(function(response) {
        $scope.articles = response.data;
    });
}])

.controller("ArticlesCategoryCtrl", function($scope, $http, $routeParams) {
    var categoryName = $routeParams.categoryName;

    $http.get("/articles/category/" + categoryName).then(function(response) {
        $scope.cat_articles = response.data;
        $scope.categoryName = categoryName;
    });
})

.controller("ArticleDetailsCtrl", function($scope, $http, $routeParams, $location) {
    var id = $routeParams.id;

    $http.get("/articles/" + id).then(function(response) {
        $scope.article= response.data;
    });

    $scope.removeArticle = function() {
        $http.delete("/articles/" + id).then(function(data) {
            console.log(data);
        });

        $location.path("/articles");
    }
})

.controller("ArticleCreateCtrl", function($scope, $http, $routeParams, $location) {
    $http.get("/categories").then(function(response) {
        $scope.categories = response.data;
    });

    $scope.addArticle = function() {
        var data = {
            title: $scope.title,
            category: $scope.category,
            content: $scope.content
        }

        $http.post("/articles", data).then(function(data, status) {
            console.log(status);
        });

        $location.path("/articles");
    }
})

.controller("ArticleEditCtrl", function($scope, $http, $routeParams, $location) {
    var id = $routeParams.id;
    
    $http.get("/categories").then(function(response) {
        $scope.categories = response.data;
    });

    $http.get("/articles/" + id).then(function(response) {
        $scope.article = response.data;
    });

    $scope.updateArticle = function() {
        var data = {
            id: id,
            title: $scope.article.title,
            category: $scope.article.category,
            content: $scope.article.content
        }

        $http.put("/articles", data).then(function(data, status) {
            console.log(status);
        });

        $location.path("/articles");
    }
});

