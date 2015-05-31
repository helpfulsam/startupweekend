export default [ '$scope', '$sce', function( $scope, $sce ) {

  var example = `
    <div>
      <h3>Introduction</h3>
      <p>
        Web pages are created using <strong>HTML</strong> and <strong>CSS</strong>. What do these languages do?
      </p>
      <ul>
        <li>HTML is used to establish a page's structure. It also lets us add text, links and images.</li>
        <li>CSS is used to control the design and layout of the page.</li>
      </ul>
    </div>
  `;

  var task = {
    progress: {
      numSteps: 3,
      currentStep: 2
    },
    steps: [
      { description: 'world', number: 1 },
      { description: example, number: 2 },
      { description: 'hello', number: 3 }
    ]
  };

  task.steps.forEach( x => {
    x.description = $sce.trustAsHtml( x.description );
  });

  $scope.task = task;

  $scope.previousStep = function() {
    if ( task.progress.currentStep > 1 ) {
      task.progress.currentStep -= 1;
    }
  };

  $scope.nextStep = function() {
    if ( task.progress.currentStep < task.progress.numSteps ) {
      task.progress.currentStep += 1;
    }
  };

}];
