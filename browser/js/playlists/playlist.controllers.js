'use strict';

juke.controller('playlists', function($scope, $log, PlaylistFactory, $state) {
  $scope.submit = function() {
    PlaylistFactory.create($scope.playlist)
    .then(function(data) {
      $log.log('The new playlist:', data);
      $scope.playlist = {};
      $state.go('playlistView', {playlistId: data.id});
    });
  };
  
});

juke.controller('playlistsList', function($scope, $log, PlaylistFactory) {
  PlaylistFactory.fetchAll()
  .then(function(data) {
    $scope.playlists = data;
  });
});

juke.controller('playlistView', function($scope, $log, PlaylistFactory, PlayerFactory, SongFactory, $stateParams) {
  PlaylistFactory.fetchById($stateParams.playlistId)
  .then(function(data) {
    $scope.playlist = data;
    $log.log('The playlist is:', $scope.playlist);
  });

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };

  SongFactory.fetchAll()
  .then(function(data) {
    $scope.allSongs = data;
  });

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.submit = function() {
    PlaylistFactory.addSong($scope.playlist.id, $scope.newSong)
    .then(function(data) {
      data = SongFactory.convert(data);
      $scope.playlist.songs.push(data);
      $log.log('the added song:', data);
      $scope.newSong = {};
    });
  };
})