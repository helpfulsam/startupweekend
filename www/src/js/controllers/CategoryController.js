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


  var updateData = function(taskIndex){
    var task =$scope.category.tasks[taskIndex];
    if(task.progress.currentStep > task.progress.numSteps){
      task.progress.currentStep -=1;
    }
   $fetch("/api/category?categoryId=" + $scope.category.categoryId + "&taskIndex=" + taskIndex, { "method": "PUT", "headers": { "Content-Type": "application/json"}, "body": JSON.stringify($scope.category.tasks[taskIndex]) }).then(function(res){
      }).then(function(categories){
        console.log(categories);
      });
  } 



  $rootScope.$on("languageChange", function(){
    swapLanguage();
  });

  $scope.goToTask = function(taskIndex){
    updateData(taskIndex);
    $router.go("/task/" + $scope.category._id + "?taskIndex=" + taskIndex); 
  }

  $scope.Math = window.Math;
  $immediate(function(){
    getData(); 
  });

}];
