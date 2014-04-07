'use strict';

angular.module('angularDemoApp', ['ngRoute'])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
            redirectTo:'/signin'
      })
      .when('/main', {
        redirectTo:'/main/main'
      })
      .when('/main/:page', {
        templateUrl: function(param){
            return 'views/component/'+param.page+'.html';
        },
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
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    $location.path('/signin');
                }
                return $q.reject(rejection);
            }
        };
  });
