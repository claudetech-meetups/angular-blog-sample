angular.module('BlogApp').controller('CategoryIndexCtrl', [
  '$scope', 'Category', function ($scope, Category) {
    Category.query(function (categories) {
      $scope.categories = categories;
    });
  }
]);
