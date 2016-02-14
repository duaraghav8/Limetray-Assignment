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
		})
		.state ('checkout', {
			url: '/checkout',
			templateUrl: '/checkout.html',
			controller: 'checkoutCtrl'
		})
		.state ('success', {
			url: '/success',
			templateUrl: '/success.html',
			controller: 'successCtrl'
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
				$scope.done = 'Error: Item already exists in cart';
				unique = false;
			}
		});

		if (!unique) {
			return;
		}
		item = JSON.parse (JSON.stringify (i));
		item.quantity = $scope.itemQty ? $scope.itemQty : 1;		//if qty is defined, set it to the number. Else default value 1
		$scope.cart.push (item);
		$scope.done = item.name + ' (Qty: ' + item.quantity.toString () + ') added to Cart';
	};
}]);

app.controller ('checkoutCtrl', ['$scope', '$resource', '$window', 'cart', function ($scope, $resource, $window, cart) {
	var totals = [0, 0],
		billingAuth = $resource ('http://localhost:8080/billingAuth');
		
	$scope.cart = cart;
	$scope.auth = new billingAuth ();
	$scope.heading = 'Your final Order';
	$scope.tax = 5;
	$scope.cart.forEach (function (item) {
		totals [0] += item.price * item.quantity;
	});
	totals [1] = totals [0] + (totals [0] * ($scope.tax / 100));
	$scope.totals = totals;

	$scope.verifyUser = function () {
		$scope.auth.data = {email: $scope.email, password: $scope.password};
		$scope.auth.$save (function (res) {
			if (res.response === 'YES') {
				$window.location.href = "#/success";
			}
			else {
				$scope.err = "Error: Incorrect Credentials";
			}
		});
	};
}]);

app.controller ('successCtrl', ['$scope', 'cart', function ($scope, cart) {
	$scope.message = "Congratulations! Your order has successfully been placed :-)";
}]);