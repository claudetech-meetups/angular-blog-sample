angular.module('BlogApp').factory('Category', [
  '$resource', function ($resource) {
    return $resource('http://localhost:5000/categories/:id');
  }
]);
