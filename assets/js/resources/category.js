angular.module('BlogApp').factory('Category', [
  '$resource', function ($resource) {
    return $resource('http://localhost:3000/categories/:id');
  }
]);
