var myApp = angular.module('capillaryApp', []);
myApp.config(function ($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
});

myApp.controller('MainController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    
    $scope.gamesData = $window.gameInfo;


    $scope.startingIndex = 0;
    $scope.endIndex = 10;
    $scope.pageNumber = 1;

    $scope.nextPage = function (pageNumber) {
        $scope.pageNumber = pageNumber;
        $scope.startingIndex = 10*(pageNumber-1);
        $scope.endIndex = $scope.startingIndex + 10;
    };

    $scope.generateArray = function (number) {
        return new  Array(number);
    } ;


    console.log("Games data in angular is", $scope.gamesData)
}]);

