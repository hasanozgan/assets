/*global module:false*/

module.exports = function(grunt) {

    var BASE_DIR   = 'components/';
    var BUILD_DIR = 'dist/';
    var FILE_NAME = 'components';

    var STYLESHEET_FILE = BUILD_DIR+FILE_NAME+'.css';
    var JAVASCRIPT_FILE = BUILD_DIR+FILE_NAME+'.js';

    var STYLESHEET_MIN_FILE = BUILD_DIR+FILE_NAME+'.min.css';
    var JAVASCRIPT_MIN_FILE = BUILD_DIR+FILE_NAME+'.min.js';

    var CSS_FILES  = [ 
                        'bootstrap/docs/assets/css/bootstrap.css',
                        'bootstrap/docs/assets/css/bootstrap-responsive.css',
                        'fullcalendar/fullcalendar.css',
    '']; 

    var JS_FILES   = [ 
                        'jquery/jquery.js',
                        'fullcalendar/fullcalendar.js', 
                        'bootstrap/docs/assets/js/bootstrap.js', 
    ''];

  var getBase= function(files) {
    var result = [];
    for (var i=0; i < files.length; i++) {
        result.push( BASE_DIR + files[i] );
    }

    return result;
  }  

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
        css: {
                src: STYLESHEET_FILE,
                dest: STYLESHEET_MIN_FILE
        }
    },
    lint: {
      files: getBase(JS_FILES) 
    },
    concat: {
      css: {
        src: getBase(CSS_FILES),
        dest: STYLESHEET_FILE
      },
      js: {
        src: getBase(JS_FILES),
        dest: JAVASCRIPT_FILE
      },
    },
    min: {
      js: {
        src: '<config:concat.js.dest>',
        dest: JAVASCRIPT_MIN_FILE
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {'goog': false}
    },
    inlineImg: {
      src: getBase(CSS_FILES),
      ie8: true /*,
      base: 'build/img',
      dest: 'build'*/
    },
    uglify: {}
  });
  
    grunt.loadNpmTasks('grunt-imagine');
    grunt.loadNpmTasks('grunt-css');
 
// Default task.
///min cssmin
  grunt.registerTask('default', 'inlineImg concat min cssmin');

};
