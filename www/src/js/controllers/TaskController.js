export default [ '$scope', '$fetch',function( $scope, $fetch ) {
  $fetch("/api/tasks/").then(function(res){
  	return res.json();
  }).then(function(tasks){
  	$scope.tasks = tasks;
  	console.log($scope.tasks);
  	$scope.apply();
  });
}];
