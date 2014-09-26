angular.module('BlogApp').controller('PostIndexCtrl', [
  '$scope', '$stateParams', 'Post', function ($scope, $stateParams, Post) {
    var search = $stateParams.category ? {category_id: $stateParams.category} : {};
    Post.query(search, function (posts) {
      $scope.posts = posts;
    });
  }
]);
