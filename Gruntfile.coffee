livereloadPort = 35729
httpServerPort = 9000

fs         = require 'fs'
path       = require 'path'
loremIpsum = require 'lorem-ipsum'

lorem = (count, options={}) ->
  if typeof count == 'number'
    options.count = count
  else
    options = count ? {}
  options.units ?= 'words'
  loremIpsum options

module.exports = (grunt) ->
  require('load-grunt-tasks')(grunt)

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    watch:
      public:
        files: ['assets/**/*', '!assets/css/**/*.styl', '!assets/css/**/*.less', '!assets/js/**/*.coffee']
        tasks: ['newer:copy:public']
      components:
        files: ['.components/*']
        tasks: ['newer:copy:components']
      coffee:
        cwd: 'assets/js'
        files: 'assets/js/**/*.coffee'
        tasks: ['brerror:newer:coffee:dev']
      stylesheets:
        cwd: 'assets/css'
        files: 'assets/css/**/*.styl'
        tasks: ['brerror:newer:stylus:dev']
      views:
        cwd: 'views'
        files: 'views/**/*.jade'
        tasks: ['brerror:newer:jade:dev']
      options:
        livereload: livereloadPort

    coffee:
      dev:
        files: [
          expand: true
          cwd: 'assets'
          src: ['js/**/*.coffee']
          dest: 'public'
          ext: '.js'
        ]

    stylus:
      dev:
        files: [
          expand: true
          cwd: 'assets'
          src: ['css/**/*.styl', '!css/**/_*.styl']
          dest: 'public'
          ext: '.css'
        ]
        options:
          compress: false
      options:
        use: [
          require 'axis-css'
        ]

    jade:
      dev:
        files: [
          expand: true
          cwd: 'views'
          src: ['**/*.jade', '!**/_*.jade', '!layout.jade']
          dest: 'public'
          ext: '.html'
        ]
        options:
          pretty: true
          data:
            lorem: lorem

    connect:
      server:
        options:
          port: httpServerPort
          keepalive: true
          debug: true
          base: 'public'
          useAvailablePort: true
          open: true
          livereload: true

    copy:
      public:
        expand: true
        cwd: 'assets'
        src: ['**/*', '!css/**/*.styl', '!css/**/*.less', '!js/**/*.coffee']
        dest: 'public'
      components:
        expand: true
        cwd: '.components'
        src: ['**/*', '!**/src/**']
        dest: 'public/components'

    concurrent:
      start:
        tasks: ['connect', 'watch', 'brerror:server']
        options:
          logConcurrentOutput: true
          gruntPath: path.join __dirname, 'node_modules', 'grunt-cli', 'bin', 'grunt'

    newer:
      options:
        override: (detail, include) ->
          cwdPath = grunt.config("#{detail.task}.#{detail.target}.files.0.cwd")
          return include() unless cwdPath?
          cwd = path.join __dirname, cwdPath
          baseFile = path.join __dirname, detail.path
          content = fs.readFileSync baseFile, 'utf8'
          compile = needsCompile cwd, baseFile, detail.time, content
          include(compile)

  needsCompile = (file, baseFile, time, content) ->
    stat = fs.statSync file
    if stat.isDirectory()
      dirFiles = fs.readdirSync(file)
      for f in dirFiles
        filepath = path.join file, f
        return true if needsCompile filepath, baseFile, time, content
    else
      return false if file == baseFile || stat.mtime < time
      filename = path.basename(file)
      word = filename.substr(0, filename.lastIndexOf('.'))
      return true if content.indexOf(word) > -1
    return false

  grunt.registerTask 'compile:dev', [
    'copy'
    'jade:dev'
    'stylus:dev'
    'coffee:dev'
  ]
  grunt.registerTask 'default', ['compile:dev', 'concurrent:start']
