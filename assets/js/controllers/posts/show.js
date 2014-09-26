angular.module('BlogApp').controller('PostShowCtrl', [
  '$scope', function ($scope) {
    $scope.post = {
      title: "Post title",
      content: "Post content",
      date: new Date()
    };
  }
]);
