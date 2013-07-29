module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      css:{
        src:['2.css','1.css'],
        dest:'dest/test.css'
      },
      js :{
        src:['1.js','2.js'],
        dest:'test.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'build/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin:{
      options: {
        banner: '/*!css <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'build/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/index.html']
    },
    jshint: {
      files: ['gruntfile.js', '1.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['1.css'],
      tasks: ['concat','cssmin']
    },
    livereload: {
      options: { livereload: true }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify','cssmin','watch']);

};