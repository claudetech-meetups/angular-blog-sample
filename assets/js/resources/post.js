angular.module('BlogApp').factory('Post', [
  '$resource', function ($resource) {
    return $resource('http://localhost:5000/posts/:id');
  }
]);
