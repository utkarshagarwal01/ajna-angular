
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
	$scope.data = [];
	$scope.dynamic_forms = [{'id':1}]
	$scope.dynamic_forms_counter = 1;
	console.log($scope.dynamic_forms);
	console.log($scope.dynamic_forms_counter);

	$scope.add_form = function(){
		$scope.dynamic_forms_counter++;
		$scope.dynamic_forms.push({'id': $scope.dynamic_forms_counter})
		console.log($scope.dynamic_forms);
		console.log($scope.dynamic_forms_counter);
	};

	$scope.remove_form = function($index){
		console.log("Remove " + $index);
		// $scope.dynamic_forms_counter--;
		$scope.dynamic_forms.splice($index, 1);
		console.log($scope.dynamic_forms);
	}

	$scope.submit = function(){
		console.log("Submit");
		var data_arr = $scope.data;
		var conditions = {};
		var len = data_arr.length;
		for (var i = 1 ; i <= len; i++) {
			conditions["condition"+i] = data_arr[i-1];
		}
		var parameter = JSON.stringify(conditions);

		url = "localhost";
		console.log(parameter);
		$http.post(url,parameter);


		
	}
});
