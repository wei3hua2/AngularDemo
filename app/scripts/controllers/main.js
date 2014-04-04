'use strict';

angular.module('angularDemoApp')
  .controller('MainCtrl', ['$scope','$http',function ($scope, $http) {
    $http.get('/api/user-info')
        .success(function(data){
            $scope.broadcast('permitted-roles',data.roles);
        });
  }])
    .controller('SigninCtrl', ['$scope','$rootScope','$http','$window','$location',function ($scope, $rootScope, $http, $window, $location) {
        $scope.user = {username:'jameschong',password:'jameschong'};

        $scope.message = '';

        $scope.submit = function () {
            console.log($scope.user);

            $http.post('/api/login',$scope.user)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    $scope.message = 'User '+data.username+' logged in!!';
                    $location.path('/main');
                })
                .error(function (data, status, headers, config) {
                    delete $window.sessionStorage.token;
                    $scope.message = 'Error: Invalid user or password';
                });
        }
    }])
    .controller('MainMenuCtrl',['$scope','$http','$location', function ($scope, $http,$location) {
        $scope.logout = function () {
            $http.get('/api/logout')
                .success(function (data, status) {
                    $location.path('/signin');
                }
                ).error(function(data) {
                    console.log(data);
                });
        }
    }])
    .controller('SubMainCtrl', ['$scope', function ($scope) {

    }])
    .controller('SubMenuCtrl', ['$scope', function ($scope) {
        $scope.$on('permitted-roles',function(data){
            console.log('permitted-roles');
            console.log(data);
        })
    }])
    .controller('SubMainComponentCtrl', ['$scope', function ($scope) {

    }]);
