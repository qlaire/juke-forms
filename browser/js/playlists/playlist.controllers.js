'use strict';

juke.controller('playlists', function($scope, $log, PlaylistFactory) {
  $scope.submit = function() {
    PlaylistFactory.create($scope.playlist)
    .then(function(data) {
      $log.log('The new playlist:', data);
      $scope.playlist = {};
    });
  };
  
});

juke.controller('playlistsList', function($scope, $log, PlaylistFactory) {
  PlaylistFactory.fetchAll()
  .then(function(data) {
    $scope.playlists = data;
  });
});