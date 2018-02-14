module.exports = function (grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    watch: {
      scripts: {
        files: ["../app/**/*.js", "!node_modules/**?*.js"],
        tasks: ["eslint", ""],
        options: {
          spawn: false,
        },
      },
    },

    eslint: {
      src: ["../app/**/*.js", "!node_modules/**?*.js"]
    },

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
            "assets/images/*",
            "assets/fonts/*",
            "partials/**/*.html",
            "lib/node_modules/jquery/dist/jquery.min.js",
            "lib/node_modules/bootstrap/dist/js/bootstrap.min.js",
            "lib/node_modules/bootstrap/dist/css/bootstrap.min.css",
            "lib/node_modules/bootswatch/dist/**/*.css",
            "lib/node_modules/bootswatch/dist/**/*.scss",
            "lib/node_modules/angular/angular.min.js",
            "lib/node_modules/angular-route/angular-route.min.js",
            "lib/node_modules/angular-fullcalendar/dist/angular.min.js",
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
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks("gruntify-eslint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  // Default task(s).
  grunt.registerTask("default", ["eslint", "watch"]);
  grunt.registerTask("deploy", ["sass", "copy"]);
  grunt.registerTask("cleanit", ["clean"]);
}