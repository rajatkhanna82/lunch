'use strict';
angular.module('Lunch.factory.requests', [])
.config(function ( $httpProvider) {        
        $httpProvider.defaults.useXDomain = true;﻿
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
         
})

.factory('requests', function($rootScope, $http, $q, AppServer){
  var baseUrl = AppServer + '/api/v0/';
  var api_key = '?api_key=special-key&neo4j=true';
  var urls = {
    'basicDetails' : 'users',
    'like' : 'likes',
    'tag' : 'tags',
    'location' :'locations',
    'matches' : 'matches',
    'pushToken' : 'pushes',
    'chat' : 'chat',
    'match' : 'match'
  };
	var exports = {
		'postBasicDetails': function(payload){
      return $http({
        method: 'POST',
        url: baseUrl + urls.basicDetails + api_key,
        data: payload
      });
    },
    'getDetails' : function(userId){
      console.log('details');
      var deferredResponse = $q.defer();
      $http({method: 'GET', url: baseUrl + urls.basicDetails + '/' + userId + api_key})
      .then(function(data) {
        deferredResponse.resolve(data);
        console.log('in get details');
      });
      return deferredResponse.promise;
    },
    'postLike': function(payload){
      return $http({
        method: 'POST',
        url: baseUrl + urls.like + api_key,
        data: payload
      });
    },
     'deleteLike': function(likeId, payload){
      return $http({
        method: 'DELETE',
        url: baseUrl + urls.like + '/' + likeId + api_key,
        data: payload
      });
    },
    'postTag': function(payload){
      return $http({
        method: 'POST',
        url: baseUrl + urls.tag + api_key,
        data: payload
      });
    },
    'deleteTag': function(tagId, userId){
      return $http({
        method: 'DELETE',
        url: baseUrl + urls.tag + '/' + tagId + api_key,
        data: userId
      });
    },
    'postLocation': function(payload){
      return $http({
        method: 'POST',
        url: baseUrl + urls.location + api_key,
        data: payload
      });
    },
    'getLocationDetails' : function(userId){
      return $http({
        method: 'GET',
        url: baseUrl + urls.location + '/'+ userId + api_key
      });
    },
    'getMatches': function(input){
      return $http({
        method: 'GET',
        url: baseUrl + urls.match + '/' + input.userId + api_key
      });
    },
    'postPushToken': function(payload){
      return $http({
        method: 'POST',
        url: baseUrl + urls.pushToken + api_key,
        data: payload
      });
    },
    'deletePushToken': function(token) {
      return $http({
        method: 'DELETE',
        url: baseUrl + urls.pushToken + '/' + token + api_key
      });
    },
    'postChat': function(matchId, message) {
      var deferredPayload = $q.defer();
      var payload = {
        message: message,
        timestamp: new Date().toISOString()
      };
      $http({
        method: 'POST',
        url: baseUrl + urls.chat + '/' + matchId + api_key,
        data: payload
      }).then(function() {
        deferredPayload.resolve(payload);
      });
      return deferredPayload.promise;
    }
    // 'postApproval': function(){
    //   $http({method: 'POST', url: baseUrl + urls.tag + api_key, data: payload
    //   })
    //   .success(function(data,status,headers,config){
    //   })
    //   .error(function(data,status,headers,config){
    //     console.log('error in posttag', data);
    //   });
    // }
	};

	return exports;
});