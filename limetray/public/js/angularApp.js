'use strict';

var app = angular.module ('limetray', ['ngResource', 'ui.router']);

app.config (['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state ('categoryList', {
			url: '/categoryList',
			templateUrl: '/categoryList.html',
			controller: 'categoryListCtrl'
		})
		.state ('category', {
			url: '/category',
			templateUrl: '/category.html',
			controller: 'categoryCtrl'
		})
		.state ('product', {
			url: '/product',
			templateUrl: '/product.html',
			controller: 'productCtrl'
		});

	$urlRouterProvider.otherwise ('categoryList');
}]);

app.factory ('apiCon', function ($resource) {
	return ($resource ('http://localhost:8080/api/:category'));
});
app.factory ('category', function () {
	var category = {
		name: null
	};
	return (category);
});
app.factory ('product', function () {
	var product = {
		item: null
	};
	return (product);
});
app.factory ('cart', function () {
	var cart = [];
	return (cart);
});

app.controller ('categoryListCtrl', ['$scope', '$window', 'category', 'apiCon', function ($scope, $window, category, apiCon) {
	$scope.heading = 'Categories';
	$scope.list = apiCon.query ();
	$scope.category = category;

	$scope.setCategory = function (c) {
		$scope.category.name = c;
		$window.location.href = "#/category";
	};
}]);

app.controller ('categoryCtrl', ['$scope', '$window', 'product', 'category', 'apiCon', function ($scope, $window, product, category, apiCon) {
	$scope.category = category;
	$scope.product = product;
	$scope.heading = $scope.category.name;
	$scope.list = apiCon.query ({category: $scope.category.name});

	$scope.setProduct = function (p) {
		$scope.product.item = p;
		$window.location.href = "#/product";
	};
}]);

app.controller ('productCtrl', ['$scope', 'product', 'apiCon', function ($scope, product, apiCon) {
	$scope.product = product;
	$scope.heading = $scope.product.item.product;
}]);