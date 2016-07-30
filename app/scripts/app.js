'use strict';

/**
 * @ngdoc overview
 * @name pimp
 * @description
 * # pimp
 *
 * Main module of the application.
 */


angular
  .module('pimp', [
    'ui.router',
    'ngAnimate'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
          .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/overview.html'
          })
          .state('test', {
            url: '/test',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/test.html',
            controller: ["$scope", function($scope){



              $scope.user={

                housePrice: 1,
                tenureYears: 1,
                oStandingLoans: 1
              }
              ;

            $scope.next = function(){
              $location.path('/dashboard');
            };

            // use factory methods here








          }]
          })

          .state('reports', {
            url: '/reports',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reports.html'
          })
          .state('housing', {
            url: '/housing',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/housing.html'
          })
          .state('marriage', {
            url: '/marriage',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/marriage.html'
          })
          .state('retirement', {
            url: '/retirement',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/retirement.html'

          }
        );
      })
