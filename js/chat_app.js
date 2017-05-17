
var app = angular.module('chat_app', []);

app.config(function($httpProvider) {
	$httpProvider.defaults.xsrfCookieName = 'csrftoken';
	$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
	$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
	$httpProvider.defaults.useXDomain = true;
	$httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
});

//Motor Insurance Controller
app.controller('motor_insurance_controller', function($http, $scope, $compile) {
	$scope.motor_insurance_messages = [];

	$scope.yes = function(){
		console.log("yes");
		$scope.motor_insurance_messages.push("Yes !");
		$scope.motor_insurance_messages.push("Awesome!");
		$("#msg").remove();
		$("#cl_mi").animate({scrollTop: 90000}, 3000);
	};

	$scope.no = function(){
		console.log("No");
		$scope.motor_insurance_messages.push("Nope !");
		$scope.motor_insurance_messages.push("Sorry, I'm still learning. Ask me another Q pls. ");
		$("#msg").remove();
		$("#cl_mi").animate({scrollTop: 90000}, 3000);
	};

	// $scope.ticket_yes = function(){
	// 	console.log("ticket yes");
	// 	$scope.motor_insurance_messages.push("Yes I would like to raise a ticket !");
	// 	$scope.motor_insurance_messages.push("Done. You'll soon hear from our customer support team !");
	// 	$("#msg").remove();
	// 	$("#cl_mi").animate({scrollTop: 90000}, 3000);
	// };

	// $scope.ticket_no = function(){
	// 	console.log("No");
	// 	$scope.motor_insurance_messages.push("Nope !");
	// 	$scope.motor_insurance_messages.push("No worries. Pls feel free to ask more Qs.");
	// 	$("#msg").remove();
	// 	$("#cl_mi").animate({scrollTop: 90000}, 3000);
	// };

	$scope.ask = function(){
		$scope.query = $("#motor_insurance_query_text").val();
		$('#motor_insurance_query_text').val('');
		$scope.motor_insurance_messages.push($scope.query);
		console.log($scope.motor_insurance_messages);
		$scope.is_busy = true;
		// $scope.qs = '/query/?query=' + $scope.query + '&filename=air_faq.xlsx&format=json';
		$scope.qs = 'http://deeplearn.zippybots.com/api/getanswer?question=' + $scope.query + '&faqset=Motor_Insurance.xlsx&format=json';
		$("#cl_mi").animate({scrollTop: 90000}, 3000);

		$http.get($scope.qs).
    	success(function(data, status){
			console.log($scope.qs);
			console.log("Successful");
			console.log(data);
			console.log(data.answer);
			if (data.answer === "Sorry! I did not find any answer to your query."){
				// var r = $compile('<div id="msg"><p>Would you like me to raise a ticket?<p><button type="button" class="btn btn-success" ng-click="ticket_yes()">Yes</button>&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-danger" ng-click="ticket_no()">No</button></div>')($scope);
				// angular.element(document.getElementById('cl_mi')).append(r);
				$scope.motor_insurance_messages.push("Sorry, I don't know this. Ask me another Q pls.");
			}
			else{
				$scope.motor_insurance_messages.push(data.answer);
			}
			confidence = parseFloat(data.confidence);
			if (confidence < 0.7 && confidence !== 0){
				var r = $compile('<div id="msg"><p>Did the above answer help you?<p><button type="button" class="btn btn-success" ng-click="yes()">Yes</button>&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-danger" ng-click="no()">No</button></div>')($scope);
				angular.element(document.getElementById('cl_mi')).append(r);
			}
			$("#cl_mi").animate({scrollTop: 90000}, 3000);
    	}).
    	error(function(data, success){
    		console.log("Error");
    		console.log(data);
			$scope.motor_insurance_messages.push("Sorry, I don't know this. Ask me another Q pls.");
			$scope.loading = false;
			console.log($scope.loading);
			$("#cl_mi").animate({scrollTop: 90000}, 3000);
    	}).
		finally(function(){
			$scope.is_busy = false;
		});
	};
});
