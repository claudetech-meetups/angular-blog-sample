angular.module('BlogApp').controller('PostIndexCtrl', [
  '$scope', function ($scope) {
    $scope.posts = [{
      title: "Post title",
      content: "Post content",
      date: new Date()
    }, {
      title: "Post title 2",
      content: "Post content 2",
      date: new Date()
    }];
  }
]);
