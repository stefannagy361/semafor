module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    connect: {
      server: {
        options: {
          port: 8080,
          hostname: "*",
          livereload: true
        }
      }
    },

    watch: {
      app: {
        files: ['index.html', 'app/app.js'],
        tasks: [],
        options: {
          livereload: 35729
        }
      },
      less: {
        files: ['assets/less/*.less'],
        tasks: ['less'],
        options: {
          livereload: 35729
        }
      }
    },

    less: {
      all: {
        files: [{
          expand: true,
          cwd: 'assets/less',
          src: ['*.less'],
          dest: 'assets/css',
          ext: '.css'
        }]
      }
    }
  });

  grunt.registerTask('dev', ['connect:server', 'watch']);
};