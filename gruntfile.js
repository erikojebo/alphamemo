module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            tmp: ['.tmp'],
            dist: ['dist']
        },
        copy: {
            appjs: {
                expand: true,
                cwd: '.tmp/appjs/',
                src: '*',
                dest: 'dist/js/'
            },
            styles: {
                expand: true,
                cwd: 'src',
                src: 'styles/*',
                dest: 'dist/'
            },
            html: {
                expand: true,
                cwd: 'src',
                src: '*.html',
                dest: 'dist/'
            },
            images: {
                expand: true,
                cwd: 'src',
                src: 'images/**/*',
                dest: 'dist/'
            },
            lib: {
                expand: true,
                cwd: 'src',
                src: 'lib/**/*',
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
                dest: 'dist/js/app.js'
            }
        },
        'ftpscript': {
            publish: {
                options: {
                    host: 'wsw35.surf-town.net',
                    authKey: 'surftown',
                    passive: false
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: [
                            '**/*'
                            //'!**/exclude.js'
                        ],
                        dest: '/eojebo/memo.erikojebo.se/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ftpscript');

    grunt.registerTask('build', [
        'clean', 'ngAnnotate', 'concat', 'copy:styles', 'copy:html', 'copy:lib', 'copy:images'
    ]);

    grunt.registerTask('dev', ['build', 'copy:appjs']);
    grunt.registerTask('prod', ['build', 'uglify']);
    grunt.registerTask('default', ['dev']);
    grunt.registerTask('publish', ['prod', 'ftpscript:publish']);
};
