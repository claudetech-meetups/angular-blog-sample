angular.module('BlogApp', [
  'ui.router'
]);

angular.module('BlogApp').config([
  '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'post_index.html',
        controller: 'PostIndexCtrl'
      })
      .state('show', {
        url: '/posts/:id',
        templateUrl: 'post_show.html',
        controller: 'PostShowCtrl'
      });
  }
]);
