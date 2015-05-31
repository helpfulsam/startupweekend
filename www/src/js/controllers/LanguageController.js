export default [ '$scope','$language', function( $scope, $language) {
  $scope.languages = $language.getLanguages();

  $scope.selectLanguage = function(name){
    $language.setLanguage(name);
  };
}];
