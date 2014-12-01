module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            tmp: ['.tmp'],
            dist: ['dist']
        },
        copy: {
            concatinatedJs: {
                expand: true,
                cwd: '.tmp/appjs/',
                src: '*',
                dest: 'dist/js/'
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
        less: {
            development: {
                files: {
                    ".tmp/styles/style.css": "src/styles/style.less",
                    ".tmp/styles/menu.css": "src/styles/menu.less",
                    ".tmp/styles/board.css": "src/styles/board.less"
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            memo: {
                files: {
                    '.tmp/controllers/app-controller.js': ['src/js/app-controller.js'],
                    '.tmp/controllers/menu-controller.js': ['src/js/menu/menu-controller.js'],
                    '.tmp/controllers/board-controller.js': ['src/js/board/board-controller.js']
                }
            }
        },
        concat: {
            jsLib: {
                src: [
                    'src/js/lib/angular.js',
                    'src/js/lib/angular-route.js',
                    'src/js/lib/angular-touch.js',
                    'src/js/lib/lodash.js',
                    'src/js/lib/fastclick.js'
                ],
                dest: '.tmp/appjs/lib.js'
            },
            jsApp: {
                options: {
                    sourceMap: true
                },
                src: [
                    'src/js/memo.js',
                    'src/js/language-viewmodel.js',
                    'src/js/localization.js',
                    '.tmp/controllers/app-controller.js',
                    '.tmp/controllers/menu-controller.js',
                    'src/js/game/valuepair.js',
                    'src/js/game/gametypes.js',
                    'src/js/game/gametypes/uppercase.js',
                    'src/js/game/gametypes/mixedcase.js',
                    'src/js/game/gametypes/lowercase.js',
                    'src/js/game/gametypes/numbers.js',
                    'src/js/board/tile-viewmodel.js',
                    'src/js/board/board-viewmodel.js',
                    '.tmp/controllers/board-controller.js'
                ],
                dest: '.tmp/appjs/app.js'
            },
            styles: {
                src: [
                    'src/styles/reset.css',
                    '.tmp/styles/style.css',
                    '.tmp/styles/menu.css',
                    '.tmp/styles/board.css'
                ],
                dest: 'dist/styles/app.css'
            }
        },
        uglify: {
            app: {
                options: {
                    sourceMap: true,
                    sourceMapIncludeSources: true,
                    sourceMapIn: '<%= concat.jsApp.dest %>.map',
                    mangle: {
                        except: [
                        ]
                    }
                },
                files: {
                    'dist/js/app.js': ['<%= concat.jsApp.dest %>']
                }
            },
            lib: {
                files: {
                    'dist/js/lib.js': ['<%= concat.jsLib.dest %>']
                }
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
        },
        'watch': {
            js: {
                files: ['src/**/*.js'],
                tasks: ['concat:jsApp', 'uglify:app'],
                options: {
                    spawn: false
                }
            },
            html: {
                files: ['src/**/*.html'],
                tasks: ['copy:html'],
                options: {
                    spawn: false
                }
            },
            styles: {
                files: ['src/**/*.less'],
                tasks: ['less:development', 'concat:styles'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-ftpscript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('build', [
        'clean',
        'less',
        'ngAnnotate',
        'concat',
        'copy:html',
        'copy:lib',
        'copy:images'
    ]);

    grunt.registerTask('dev', ['build', 'copy:concatinatedJs']);
    grunt.registerTask('prod', ['build', 'uglify']);
    grunt.registerTask('default', ['dev', 'watch']);
    grunt.registerTask('publish', ['prod', 'ftpscript:publish']);
};
