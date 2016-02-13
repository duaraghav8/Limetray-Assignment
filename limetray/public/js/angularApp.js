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

app.controller ('productCtrl', ['$scope', 'product', 'cart', 'apiCon', function ($scope, product, cart, apiCon) {
	$scope.product = product;
	$scope.cart = cart;
	$scope.heading = $scope.product.item.product;

	$scope.addToCart = function (i) {
		var item = null,
			unique = true;

		$scope.cart.forEach (function (item) {
			if (item.name === i.name) {
				console.log ('Error: Item already exists in cart');
				unique = false;
			}
		});

		if (!unique) {
			return;
		}
		//////////////////////////////below line is assigning by reference, is making changes in the actual object!! BUGGGGG///////////////////////
		item = i;
		item.quantity = $scope.itemQty ? $scope.itemQty : 1;		//if qty is defined, set it to the number. Else default value 1
		$scope.cart.push (item);
		console.log ('Final Cart contents: ', $scope.cart);
	};
}]);