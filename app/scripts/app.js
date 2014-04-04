'use strict';

angular.module('angularDemoApp', ['ngRoute'])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
            redirectTo:'/signin'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/signin', {
        templateUrl: 'views/signin.html',
        controller: 'SigninCtrl'
      })
      .otherwise({
        redirectTo: '/signin'
      });

    $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function ($window, $q, $location, $rootScope) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            response: function (response) {
                console.log('response : ');
                console.log(response);
                console.log(response.status);
                if (response.status === 401) {
                    $location.path('/signin');
                }
                return response || $q.when(response);
            }
        };
  });
