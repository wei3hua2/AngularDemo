'use strict';

angular.module('angularDemoApp')
  .controller('MainCtrl', ['$scope','$http','$routeParams',function ($scope, $http, $routeParams) {
        console.log($routeParams);
        $http.get('/api/user-info')
            .success(function(data){
                $scope.$broadcast('permitted-roles',data.roles);
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
    .controller('MainMenuCtrl',['$scope','$http','$location', function ($scope, $http, $location) {
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
    .controller('xMainCtrl', ['$scope', function ($scope) {
        console.log('xMainCtrl');
    }])
    .controller('SubMenuCtrl', ['$scope', function ($scope) {

        $scope.menus = [
            {name:"Home",
                items:[{name:"home 1"},{name:"home 2"},{name:"home 3"}]
            },
            {name:"Profile",
                items:[{name:"profile 1"},
                    {name:"profile 2",
                        subitems:[{name:"profile 21"},{name:"profile 22"}]
                    },
                    {name:"profile 3"}]},
            {name:"Message",
                items:[{name:"msg 1"},{name:"msg 2"},{name:"msg 3"}]}
//            "Home":[
//                "home item 1",
//                "home item 2",
//                ["home item 31","home item 32","home item 33"],
//                "home item 4"
//            ],
//            "Profile":[
//                "profile 1",
//                "profile 2",
//                "profile 3"
//            ],
//            "Message":[
//                "msg 1",
//                "msg 2"
//            ]
        ];

        $scope.$on('permitted-roles',function(data){
            console.log('permitted-roles');
            console.log(data);
        })
    }]);
