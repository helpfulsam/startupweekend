export default [ '$scope', '$fetch','$router','$language','$rootScope',function( $scope, $fetch, $router, $language, $rootScope) {


  $rootScope.$on("languageChange", function(){
    getData();
  });

   var getData = function() {
    $fetch("/api/category?lang=" + $language.getLanguage()).then(function(res){
  	 return res.json();
    }).then(function(categories){
  	 $scope.categories = categories;
  	 $scope.$evalAsync();
    });
  }

  getData();
  
  $scope.goToCategory = function(id){
  	$router.go("/category/" + id);
  };

}];
