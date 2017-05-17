$(document).ready(function(){
	$('#add').click(function (e){
		$('#items').append('<div><input type="text" name="user-name"><input type="text" name="user-email"></div>');
	});
});