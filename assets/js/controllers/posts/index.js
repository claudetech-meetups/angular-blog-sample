angular.module('BlogApp').controller('PostIndexCtrl', [
  '$scope', 'Post', function ($scope, Post) {
    Post.query(function (posts) {
      $scope.posts = posts;
    });
  }
]);
