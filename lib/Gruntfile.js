module.exports = function (grunt) {
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  // grunt.loadNpmTasks("gruntify-eslint");

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      scripts: {
        files: ["../app/**/*.js", "!node_modules/**?*.js"],
        tasks: [""],
        options: {
          spawn: false,
          livereload: true,
        },
      },
    },

    // eslint: {
    //   src: ["../app/**/*.js", "!node_modules/**?*.js"]
    // },

    clean: {
      options: { force: true },
      public: ["../public"]
    },
    copy: {
      dev: {
        files: [{
          expand: true,
          cwd: "../",
          src: [
            "index.html",
            "images/*",
            "styles/**/*.css",
            "css/*.css",
            "assets/css/*.css",
            "assets/js/*.js",
            "assets/js/**/*.js",
            "assets/*",
            "assets/images/*",
            "assets/fonts/*",
            "partials/**/*.html",
            "app/*",
            "app/*.js",
            "app/**/*.js",
            "app/**/**/*.js",
            "app/**/*.html",
            "lib/node_modules/jquery/dist/jquery.min.js",
            "lib/node_modules/bootstrap/dist/js/bootstrap.min.js",
            "lib/node_modules/bootstrap/dist/css/bootstrap.min.css",
            "lib/node_modules/bootstrap/dist/**/*",
            "lib/node_modules/bootswatch/dist/**/*.css",
            "lib/node_modules/bootswatch/dist/**/*.scss",
            "lib/node_modules/angular/angular.min.js",
            "lib/node_modules/angular/angular.min.map",
            "lib/node_modules/angular-route/angular-route.min.js",
            "lib/node_modules/angular-route/angular-route.min.map",
            "lib/node_modules/angular-fullcalendar/dist/angular-fullcalendar.min.js",
            "lib/node_modules/firebase/*",
            "lib/node_modules/firebase/**/*",
            "lib/node_modules/fullcalendar/dist/fullcalendar.min.js",
            "lib/node_modules/fullcalendar-scheduler/dist/scheduler.min.js",
            "lib/node_modules/moment/moment.js",
            "lib/node_modules/popper.js/dist/popper.min.js",
            "lib/node_modules/angular-sanitize/angular-sanitize.min.js",
            "lib/node_modules/angular-animate/angular-animate.min.js",
            "lib/node_modules/angular-route/angular-route.min.js",
            "lib/node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js",
            "lib/node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
            "javascripts/**/*.js"
          ],
          dest: "../public/"
        }]
      }
    }
  }
)


  // Default task(s).
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("deploy", ["copy"]);
  grunt.registerTask("cleanit", ["clean"]);
}