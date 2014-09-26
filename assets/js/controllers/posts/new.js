angular.module('BlogApp').controller('PostNewCtrl', [
  '$scope', 'Post', '$state', 'categories', function ($scope, Post, $state, categories) {
    $scope.post = new Post();
    $scope.categories = categories;

    $scope.createPost = function () {
      $scope.post.$save(function () {
        $state.go('index');
      });
    };
  }
]);
