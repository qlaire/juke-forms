'use strict';

juke.config(function ($stateProvider) {
  $stateProvider.state('newPlaylist', {
    url: '/playlists/new',
    templateUrl: '/js/playlists/templates/playlists.html',
    controller: 'playlists'
  });

  $stateProvider.state('playlistView', {
    url: '/playlists/:playlistId',
    templateUrl: 'js/playlists/templates/playlist.html',
    controller: 'playlistView'
  });
});
