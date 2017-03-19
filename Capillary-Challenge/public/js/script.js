var myApp = angular.module('capillaryApp', []);
myApp.config(function ($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
});

myApp.controller('MainController', ['$scope', '$window', '$http', function ($scope, $window, $http) {
    
    $scope.gamesData = $window.gameInfo;
    

    console.log("Games data in angular is", $scope.gamesData)
}]);

