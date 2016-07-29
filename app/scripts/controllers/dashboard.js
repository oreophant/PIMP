'use strict';

/**
 * @ngdoc function
 * @name pimp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of pimp
 */
angular.module('pimp')
  .controller('DashboardCtrl', function($scope, $state) {

    $scope.$state = $state;

  });
