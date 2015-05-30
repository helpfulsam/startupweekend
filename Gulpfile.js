require( 'dotenv' ).load();
var args = require( 'yargs' )
  .default( 'port', process.env.PORT )
  .default( 'debug', 5858 )
  .argv;

require( '@stephenbunch/buildpack/register' )( require( 'gulp' ), {
  template: 'fullstack',
  options: {
    projectDir: __dirname,
    serve: {
      entry: 'app/index.js',
      nodeArgs: [ '--debug=' + args.debug ],
      appArgs: [ '--port=' + args.port ],
      watch: [ 'www/views/**/*.html' ],
    },
    make: {
      'app': {
        js: [{
          entry: 'www/src/js/index.js',
          outfile: 'www/js/app.js',
          shim: {
            'angular': 'angular',
            'fetch': 'fetch',
            'jQuery': '$',
            'lodash': '_',
            'matchMedia': 'matchMedia',
            'moment': 'moment',
            '@stephenbunch/event': 'event',
            '@stephenbunch/path': 'path',
          }
        }],
        sass: [{
          src: 'www/src/sass/**/*.scss',
          outdir: 'www/css',
        }]
      },
      'lib': {
        outputDir: 'www/lib',
        js: [{
          files: [
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/media-match/media.match.js',
            'bower_components/fetch/fetch.js',
            'node_modules/@stephenbunch/event/dist/event.js',
            'node_modules/@stephenbunch/path/dist/path.js',
          ],
          outfile: 'bundle.js'
        }],
        copy: {
          'bower_components/components-font-awesome/{css,fonts}/*': 'components-font-awesome',
          'node_modules/babel/node_modules/babel-core/browser-polyfill?(.min).js': 'babel',
        }
      }
    },
    clean: 'www/{css,js,lib}'
  }
});
