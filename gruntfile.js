module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            appjs: {
                expand: true,
                cwd: '.tmp/appjs/',
                src: '*',
                dest: 'dist/'
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            memo: {
                files: {
                    '.tmp/controllers/menu-controller.js': ['src/js/menu/menu-controller.js'],
                    '.tmp/controllers/board-controller.js': ['src/js/board/board-controller.js']
                }
            }
        },
        concat: {
            options: {
                sourceMap: true
            },
            dist: {
                src : [
                    'src/js/lib/angular.js',
                    'src/js/lib/angular-route.js',
                    'src/js/lib/lodash.js',
                    'src/js/lib/fastclick.js',
                    'src/js/memo.js',
                    '.tmp/controllers/menu-controller.js',
                    'src/js/board/tile-factory.js',
                    'src/js/board/tile-viewmodel.js',
                    'src/js/board/board-viewmodel.js',
                    '.tmp/controllers/board-controller.js'
                ],
                dest: '.tmp/appjs/app.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true,
                sourceMapIncludeSources: true,
                sourceMapIn: '.tmp/appjs/app.js.map',
                mangle: {
                    except: [
                    ]
                }
            },
            dist: {
                src : '<%= concat.dist.dest %>',
                dest: 'dist/app.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('concatAll', ['ngAnnotate', 'concat']);
    grunt.registerTask('dev', ['concatAll', 'copy:appjs']);
    grunt.registerTask('prod', ['concatAll', 'uglify']);
    grunt.registerTask('default', ['dev']);
};
