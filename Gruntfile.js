module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        uglify: {
            options: {
                stripBanners: true,
                banner: '/*! <%=pkg.name%>-<%=pkg.version%>.js <%=grunt.template.today("yyyy-mm-dd")%>*/\n'
            },
            build: {
                src: 'build/*.js',
                dest: "build/<%=pkg.name%>-<%=pkg.version%>.js.min.js"
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            compress: {
                files: {
                    'src/default.css': [
                        "src/*.css"
                    ]
                }
            }
        },
        jshint: {
            build: ['Gruntfile.js', 'src/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        watch: {
            build: {
                files: ['src/*.js', 'src/*.css'],
                tasks: ['jshint', 'csslint','concat', 'uglify', 'cssmin'],
                options: { spawn: false }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['build/*.js'],
                dest: 'build/built.js',
            },
        },
        csslint: {
            build: ['src/*.css'],
            options: {
                csslintrc: '.csslintrc'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ["jshint", "csslint",'concat', "uglify", 'cssmin','watch']);
};
