export default ['$rootScope',
function($rootScope) {
  return { 
    language: "es",
    languages: [{name:"en",image:"img/United-Kingdom.png" },{name:"es", image:"img/Spain.png"}],
    getLanguage: function(){
      return this.language;
    },
    setLanguage: function(language){
      this.language = language;
      $rootScope.$broadcast("languageChange");
    },
    getLanguages: function(){
      return this.languages;
    }
  };
}];
