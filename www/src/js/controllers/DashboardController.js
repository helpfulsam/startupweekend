export default [ '$scope', '$fetch','$router',function( $scope, $fetch, $router ) {
  $fetch("/api/category/").then(function(res){
  	return res.json();
  }).then(function(categories){
  	$scope.categories = categories;
  	console.log($scope);
  	$scope.$evalAsync();
  });

  //$fetch("api/tasks/", { method: "PUT", body: JSON.stringify(task), headers: { "Content-Type": "application/json" } }).then(function(){
  //});
  
  $scope.goToCategory = function(id){
  	$router.go("/category/" + id);
  }

}];
