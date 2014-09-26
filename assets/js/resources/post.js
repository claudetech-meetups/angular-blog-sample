angular.module('BlogApp').factory('Post', [
  '$resource', function ($resource) {
    return $resource('http://angular-tutorial-api.herokuapp.com/posts/:id');
  }
]);
