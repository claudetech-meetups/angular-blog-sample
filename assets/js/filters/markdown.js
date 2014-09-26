angular.module('BlogApp').filter('markdown', [
  '$sce', function ($sce) {
    return function (input) {
      if (!input) {
        return '';
      }
      return $sce.trustAsHtml(markdown.toHTML(input));
    };
  }
]);
