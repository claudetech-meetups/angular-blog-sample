angular.module('BlogApp').factory('Post', [
  '$resource', function ($resource) {
    return $resource('http://localhost:3000/posts/:id');
  }
]);
