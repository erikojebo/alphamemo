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
                    'src/js/game/gametypes/letters.js',
                    'src/js/game/gametypes/numbers.js',
                    'src/js/game/gametypes/rhyme.js',
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
        cacheBust: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 16
            },
            assets: {
                files: [{
                    src: ['dist/index.html']
                }]
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
        'autoshot': {
            responsive: {
                options: {
                    path: '.tmp/screenshots',
                    remote: null,
                    local: {
                        path: './dist',
                        port: 16332,
                        files: [{
                                src: 'index.html#/menu/',
                                dest: 'menu.png',
                                delay: 0
                            }, {
                                src: 'index.html#/board/rhyme-uppercase/3x2?reveal',
                                dest: 'small_board.png',
                                delay: 0
                            }, {
                                src: 'index.html#/board/rhyme-uppercase/4x3?reveal',
                                dest: 'medium_board.png',
                                delay: 0
                            }, {
                                src: 'index.html#/board/rhyme-uppercase/5x4?reveal',
                                dest: 'large_board.png',
                                delay: 0
                            }
                        ]
                    },
                    viewport: [
                        '1980x1080', '1200x800',  // Desktop
                        '320x528', '528x320',     // iPhone 5
                        '384x640', '640x384',     // Galaxy Nexus
                        '1024x768', '768x1024'    // iPad
                    ]
                }
            }
        },
        'watch': {
            gruntConfig: {
                files: 'gruntfile.js',
                options: {
                    reload: true
                }
            },
            app: {
                files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.less'],
                tasks: ['dev'],
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
    grunt.loadNpmTasks('grunt-cache-bust');
    grunt.loadNpmTasks('grunt-autoshot');

    grunt.registerTask('rebuild', ['clean', 'build']);

    grunt.registerTask('build', [
        'less',
        'ngAnnotate',
        'concat',
        'copy:html',
        'copy:lib',
        'copy:images'
    ]);

    grunt.registerTask('dev', ['build', 'copy:concatinatedJs']);
    grunt.registerTask('prod', ['rebuild', 'uglify']);
    grunt.registerTask('default', ['dev', 'watch']);
    grunt.registerTask('publish', ['prod', 'ftpscript:publish']);
    grunt.registerTask('screenshot', ['prod', 'autoshot']);
};
