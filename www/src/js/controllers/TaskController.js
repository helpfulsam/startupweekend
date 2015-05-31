export default [ '$scope', '$sce','$immediate','$rootScope','$fetch','$language','$router', function( $scope, $sce, $immediate, $rootScope, $fetch, $language, $router) {

  var swapLanguage = function(){
    $fetch("/api/category?categoryId=" + $scope.category.categoryId + "&lang=" + $language.getLanguage()).then(function(res){
    return res.json();
    }).then(function(category){
      $scope.category = category;
      $scope.category.tasks[$scope.taskIndex].steps.forEach( x => {
        x.description = $sce.trustAsHtml( x.description );
      });
      $scope.$evalAsync();
    });
  }

  var updateData = function(){
   $fetch("/api/category?categoryId=" + $scope.category.categoryId + "&taskIndex=" + $scope.taskIndex, { "method": "PUT", "headers": { "Content-Type": "application/json"}, "body": JSON.stringify($scope.category.tasks[$scope.taskIndex]) }).then(function(res){
      return res.json();
      }).then(function(categories){
        console.log(categories);
      });
  } 

  $immediate(function(){
    $scope.taskIndex = $scope.route.params.query.taskIndex;




    var getData = function(){
      $fetch("/api/category/" + $scope.route.params.id).then(function(res){
      return res.json();
      }).then(function(category){
        $scope.category = category;
        $scope.category.tasks[$scope.taskIndex].steps.forEach( x => {
          x.description = $sce.trustAsHtml( x.description );
        });

        $scope.$evalAsync();
      });
    }


    getData();
  });


  $rootScope.$on("languageChange", function(){
    swapLanguage();
  });

  $scope.previousStep = function() {
    if ( $scope.category.tasks[$scope.taskIndex].progress.currentStep > 1 ) {
      $scope.category.tasks[$scope.taskIndex].progress.currentStep -= 1;
      updateData();
    }
  };


  var goBack = function(){
    $router.go("/category/" + $scope.category._id);
  }

  $scope.goBack = goBack;

  $scope.nextStep = function() {
      $scope.category.tasks[$scope.taskIndex].progress.currentStep += 1;
    if ( $scope.category.tasks[$scope.taskIndex].progress.currentStep <= $scope.category.tasks[$scope.taskIndex].progress.numSteps ) {
      updateData();
    }else {
      updateData();
      goBack();
    }
  };

}];
