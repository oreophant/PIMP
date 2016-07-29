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
    };
    $scope.quote= function(){

      var quotes= [
        '“A penny here, and a dollar there, placed at interest, goes on accumulating, and in this way the desired result is attained. It requires some training, perhaps, to accomplish this economy, but when once used to it, you will find there is more satisfaction in rational saving than in irrational spending.” -P. T. Barnum',
        '“Many people take no care of their money till they come nearly to the end of it, and others do just the same with their time.” -Johann Wolfgang von Goethe',
        '“Old men are always advising young men to save money. That is bad advice. Don’t save every nickel. Invest in yourself. I never saved a dollar until I was forty years old.” -Henry Ford',
        '“My old father used to have a saying:  If you make a bad bargain, hug it all the tighter. ” -Abraham Lincoln',
        '“Money never made a man happy yet, nor will it. The more a man has, the more he wants. Instead of filling a vacuum, it makes one.” -Ben Franklin',
        '“Too many people spend money they haven’t earned, to buy things they don’t want, to impress people they don’t like.” -Will Smith',
        '“Only buy something that you’d be perfectly happy to hold if the market shut down for ten years.” -Warren Buffett'
      ];

      var numQuote = Math.floor(Math.random()*(6));

      return quotes[numQuote];

    };


  });
