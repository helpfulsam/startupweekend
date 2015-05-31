export default [ '$scope', '$fetch','$router','$immediate','$rootScope','$language', function( $scope, $fetch, $router, $immediate, $rootScope, $language ) {

   var swapLanguage = function(){
    $fetch("/api/category?categoryId=" + $scope.category.categoryId + "&lang=" + $language.getLanguage() ).then(function(res){
    return res.json();
    }).then(function(category){
      $scope.category = category;
      //console.log($scope.category);
      $scope.$evalAsync();
    });
  }

  var getData = function(){
    $fetch("/api/category/" + $scope.route.params.id).then(function(res){
    return res.json();
    }).then(function(category){
      $scope.category = category;
      //console.log($scope.category);
      $scope.$evalAsync();
    });
  }


  $rootScope.$on("languageChange", function(){
    swapLanguage();
  });

  $scope.Math = window.Math;
  $immediate(function(){
    getData(); 
  });

}];
