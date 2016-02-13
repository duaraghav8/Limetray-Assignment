'use strict';

var app = angular.module ('limetray', ['ngResource', 'ui.router']);

app.config (['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state ('categoryList', {
			url: '/categoryList',
			templateUrl: '/categoryList.html',
			controller: 'categoryListCtrl'
		});
/*		.state ('category', {
			url: '/category',
			templateUrl: '/category.html',
			controller: 'categoryCtrl'
		})
		.state ('product', {
			url: '/product',
			templateUrl: '/product.html',
			controller: 'productCtrl'
		});*/

	$urlRouterProvider.otherwise ('categoryList');
}]);

app.factory ('apiCon', function ($resource) {
	return ($resource ('http://localhost:8080/api/:category'));
});

app.controller ('categoryListCtrl', ['$scope', 'apiCon', function ($scope, apiCon) {
	$scope.list = apiCon.query (function (entry) {
		console.log (entry);
	});
}]);