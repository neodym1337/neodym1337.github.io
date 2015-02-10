'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                src: ['cast.js', 'game.js', 'index.html', 'jquery-1.11.0.min.js'], dest: 'dist/receiver/', filter: 'isFile'
            },
            dev2: {
                src: ['cast.js', 'game.js', 'index.html', 'jquery-1.11.0.min.js'], dest: 'dist/receiver2/', filter: 'isFile'
            },
            dev3: {
                src: ['cast.js', 'game.js', 'index.html', 'jquery-1.11.0.min.js'], dest: 'dist/receiver3/', filter: 'isFile'
            }
        },
        'gh-pages': {
            options: {
                base: 'dist',
                add: true
            },
            src: ['**']
        },
        'clean': ['dist']
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('dist', ['clean', 'copy']);
    grunt.registerTask('dist-dev2', ['clean', 'copy:dev2']);
    grunt.registerTask('dist-dev3', ['clean', 'copy:dev3']);
};