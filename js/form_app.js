
var app = angular.module('form_app', []);

app.config(function($httpProvider) {
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
});

app.controller('form_controller', function($http, $scope, $compile) {
	console.log("Form Controller");
	
	$scope.data = {};

	$scope.getCount = function(count) {
    	console.log($scope.count);
    	return new Array(count);
	}

	$scope.submit = function(){
		console.log("Submit");
		var condition = $scope.data;
		console.log(condition);
		console.log(JSON.stringify(condition));
		
	}
});
