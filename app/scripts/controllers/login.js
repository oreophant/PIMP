'use strict';

/**
 * @ngdoc function
 * @name pimp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of pimp
 */
angular.module('pimp')
  .controller('LoginCtrl', function($scope, $location) {

    $scope.submit = function() {

      $location.path('/dashboard');

      return false;
    }


  });
