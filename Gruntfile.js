module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

  grunt.initConfig({
    cacheBust: {
      index: {
        options: {
          assets: ['main.css','js/main.js'],
          queryString: true
        },
        src: ['index.html']
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/jquery-2.1.0.js', 'js/bootstrap.js', 'js/blocs.js'],
        dest: 'js/main.js',
      },
    },
    copy:{
      index:{
        src: 'index.html',
        dest: 'index.copy.html',
      }
    },
    less: {
      development: {
        options: {
          compress: false,
          cleancss: false,
          optimization: 2,
          relativeUrls: true
        },
        files: {
          // target.css file: source.less file
          'main.css': 'main.less'
        }
      },
      production: {
        options: {
          compress: true,
          cleancss: true,
          optimization: 2,
          relativeUrls: true
        },
        files: {
          // target.css file: source.less file
          'main.css': 'main.less'
        }
      }
    },
    replace:{
      buildindex:{
        src: ['index.copy.html'],
        dest: ['index.html'],
        replacements:[
          {
            from: 'href="style.css"',
            to: 'href="main.css"'
          },
          {
            from: '<script src="./js/jquery-2.1.0.js"></script>',
            to: ''
          },
          {
            from: '<script src="./js/bootstrap.js"></script>',
            to: ''
          },
          {
            from: '<script src="./js/blocs.js"></script>',
            to: '<script src="./js/main.js"></script>'
          },
          {
            from: '<link rel="stylesheet" type="text/css" href="./css/bootstrap.css">',
            to: ''
          },
          {
            from: '<link rel="stylesheet" href="./css/animate.css" />',
            to: ''
          },
          {
            from: "<link rel='stylesheet' href='./css/font-awesome.min.css'/>",
            to: ''
          },
          {
            from: "<link rel='stylesheet' href='./css/ionicons.min.css'/>",
            to: ''
          },
          {
            from: "<link rel='stylesheet' href='./css/linecons.min.css'/>",
            to: ''
          },
          {
            from: 'data-caption="Image description"',
            to: ''
          }
        ]
      }
    },
    watch: {
      less:{
        files: ['main.less'], // which files to watch
        tasks: ['less:production'],
        options: {
          livereload: true
        }
      },
      blocs:{
        files: ['style.css'],
        tasks: ['newer:copy','replace','concat','less:production'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.registerTask( 'copyfiles', ['copy']);
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('setup', ['replace','concat']);
  grunt.registerTask('build', ['copy', 'concat', 'replace', 'cacheBust','less:production']);
  grunt.registerTask('builddev', ['less:development']);
};