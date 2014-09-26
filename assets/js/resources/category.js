angular.module('BlogApp').factory('Category', [
  '$resource', function ($resource) {
    return $resource('http://angular-tutorial-api.herokuapp.com/categories/:id');
  }
]);
