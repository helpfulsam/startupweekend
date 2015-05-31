export default [ '$scope', '$fetch','$router','$immediate', function( $scope, $fetch, $router, $immediate ) {
  $immediate(function(){
  $scope.Math = window.Math;
  $fetch("/api/category/" + $scope.route.params.id).then(function(res){
  	return res.json();
  }).then(function(category){
  	$scope.category = category;
  	//console.log($scope.category);
  	$scope.$evalAsync();
  });
});

  //$fetch("api/tasks/", { method: "PUT", body: JSON.stringify(task), headers: { "Content-Type": "application/json" } }).then(function(){
  //});
  
  //$scope.clickedTask = function(){
  //	$router.go("/tasks");
  //}

}];
