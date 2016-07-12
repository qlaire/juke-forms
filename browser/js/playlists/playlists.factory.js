'use strict';

juke.factory('PlaylistFactory', function($http, SongFactory) {

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

  PlaylistFactory.fetchById = function(id) {
    return $http.get('api/playlists/' + id)
    .then(function (response) {
      return response.data;
    })
    .then(function(playlist) {
      playlist.songs = playlist.songs.map(SongFactory.convert);
      return playlist;
    });
  };

  PlaylistFactory.addSong = function(playlistId, song) {
    return $http.post('api/playlists/' + playlistId + '/songs', song)
    .then(function(response) {
      return response.data;
    })
    .then(SongFactory.convert);
  };

  return PlaylistFactory;
});
