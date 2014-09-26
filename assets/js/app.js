angular.module('BlogApp', [
  'ui.router',
  'ngResource'
]);

angular.module('BlogApp').config([
  '$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('index', {
        url: '/',
        templateUrl: 'posts/index.html',
        controller: 'PostIndexCtrl'
      })
      .state('new', {
        url: '/posts/new',
        templateUrl: 'posts/new.html',
        controller: 'PostNewCtrl',
        resolve: {
          categories: ['$q', 'Category', function ($q, Category) {
            var deferred = $q.defer();
            Category.query(function (categories) {
              deferred.resolve(categories);
            });
            return deferred.promise;
          }]
        }
      })
      .state('show', {
        url: '/posts/:id',
        templateUrl: 'posts/show.html',
        controller: 'PostShowCtrl'
      });
  }
]);
