'use strict';
angular.module('Lunch.matched', ['Lunch.factory.requests'])
.config(function($stateProvider){
  $stateProvider
  .state('app.matched', {
      url: '/matched',
      views: {
        'menuContent' :{
          templateUrl: 'templates/matched.html',
          controller: 'MatchedCtrl'
        }
      }
  });
})
.controller('MatchedCtrl', function($rootScope, $scope, requests, match){
    var initialize = function() {
      requests.getDetails(match).then(function(res) {
        res.data.photo_url = res.data.profileImage;
        angular.extend($scope,res.data);
      });
    };

    initialize();
});