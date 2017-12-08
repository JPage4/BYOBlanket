module.exports = function(grunt) {
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
}
)
// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks("gruntify-eslint");
grunt.loadNpmTasks("grunt-contrib-watch");
// Default task(s).
grunt.registerTask("default", ["eslint", "watch"]);
}