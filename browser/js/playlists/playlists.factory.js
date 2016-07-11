'use strict';

juke.factory('PlaylistFactory', function($http) {

  var cachedPlaylists = [];

  var PlaylistFactory = {};

  PlaylistFactory.create = function(data) {
    return $http.post('api/playlists', data)
    .then(function(response) {
      var playlist = response.data;
      cachedPlaylists.push(playlist);
      return playlist;
    });
  };

  PlaylistFactory.fetchAll = function () {
    return $http.get('api/playlists')
    .then(function(response) {
      angular.copy(response.data, cachedPlaylists);
      return cachedPlaylists;
    });
  };

  return PlaylistFactory;
});