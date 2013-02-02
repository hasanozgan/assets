/*global module:false*/

module.exports = function(grunt) {

    var BASE_DIR   = 'components/';
    var BUILD_DIR = 'dist/';
    var FILE_NAME = 'components';

    var STYLESHEET_FILE = BUILD_DIR+FILE_NAME+'.css';
    var JAVASCRIPT_FILE = BUILD_DIR+FILE_NAME+'.js';
    var IE_JAVASCRIPT_FILE = BUILD_DIR+'ie.js';


    var STYLESHEET_MIN_FILE = BUILD_DIR+FILE_NAME+'.min.css';
    var JAVASCRIPT_MIN_FILE = BUILD_DIR+FILE_NAME+'.min.js';
    var IE_JAVASCRIPT_MIN_FILE = BUILD_DIR+'ie.min.js';


    var CSS_FILES  = [ 
                        'bootstrap/docs/assets/css/bootstrap.css',
//                        'bootstrap/docs/assets/css/bootstrap-responsive.css',
//                        'fullcalendar/fullcalendar.css',
                        'bootstrap-datepicker/css/datepicker.css',
                        'bootstrap-colorpicker/css/colorpicker.css',
                        'bootstrap-timepicker/compiled/timepicker.css',
                        'jquery-multiselect/jquery.multiselect.css',
                        'antiscroll/antiscroll.css',
                        'jquery-validation.password/jquery.validate.password.css',
    '']; 

    var JS_FILES   = [ 
                        'jquery/jquery.js',
//                        'jquery-ui/ui/jquery-ui.custom.js',
                        'bootstrap/docs/assets/js/bootstrap.js', 
                        'handlebars/handlebars.js',
                        'underscore/underscore.js', 
                        'backbone/backbone.js', 
                        'marionette/lib/backbone.marionette.js',

                        // Plugins
                        'fullcalendar/fullcalendar.js', 
                        'jquery.actual/jquery.actual.js',
                        'bootstrap-colorpicker/js/bootstrap-colorpicker.js',
                        'bootstrap-datepicker/js/bootstrap-datepicker.js',
                        'bootstrap-timepicker/js/bootstrap-timepicker.js',
                        'antiscroll/antiscroll.js',
                        'jquery.cookie/jquery.cookie.js',
                        'jquery.sticky/jquery.sticky.js',
                        'jquery-multiselect/jquery.multiselect.js',
                        'jquery.validation/jquery.validate.js',
                        'jquery-validation.password/jquery.validate.password.js',

    ''];

    var IE_JS_FILES = [ 
                        'html5shiv/src/html5shiv.js',
                        'html5shiv/src/html5shiv-printshiv.js',
                        'Respond/respond.src.js',
                        'excanvas/excanvas.js',
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
      ie: {
        src: getBase(IE_JS_FILES),
        dest: IE_JAVASCRIPT_FILE
      },

    },
    min: {
      js: {
        src: '<config:concat.js.dest>',
        dest: JAVASCRIPT_MIN_FILE
      },
      ie: {
        src: '<config:concat.ie.dest>',
        dest: IE_JAVASCRIPT_MIN_FILE
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
