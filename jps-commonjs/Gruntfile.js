'use strict';

module.exports = function (grunt) {
	// Load all grunt tasks
	require( 'load-grunt-tasks' )( grunt );
	// Show elapsed time at the end.
	require( 'time-grunt' )( grunt );

	// Project configuration.
	grunt.initConfig( {
		// Metadata.
		pkg: grunt.file.readJSON( 'package.json' ), banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed MIT */\n',
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>', stripBanners: true
			}, dist: {
				src: ['src/<%= pkg.name %>.js'], dest: 'dist/<%= pkg.name %>.js'
			},
		}, uglify: {
			options: {
				banner: '<%= banner %>'
			}, dist: {
				src: '<%= concat.dist.dest %>', dest: 'dist/<%= pkg.name %>.min.js'
			},
		},
		nodeunit: {
			files: ['test/**/*_test.js']
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc', reporter: require( 'jshint-stylish' )
			}, gruntfile: {
				src: 'Gruntfile.js'
			}, lib: {
				options: {
					jshintrc: 'src/.jshintrc'
				}, src: ['src/**/*.js']
			}, test: {
				src: ['test/**/*.js']
			},
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>', tasks: ['jshint:gruntfile']
			},
			lib: {
				files: '<%= jshint.lib.src %>', tasks: ['nodeunit']
			},
			coffee: {
				files: 'src/**/*.coffee', tasks: ['coffee']
			},
			test: {
				files: '<%= jshint.test.src %>', tasks: ['jshint:test', 'nodeunit']
			},
		},
		// Compiles CoffeeScript to JavaScript
		coffee: {
			options: {
				bare: true, sourceMap: false, sourceRoot: 'src'
			}, dist: {
				files: [
					{
						expand: true, cwd: 'src', src: '{,*/}*.coffee', dest: 'dist', ext: '.js'
					}
				]
			}, test: {
				files: [
					{
						expand: true, cwd: 'test', src: '**/*.coffee', dest: '', ext: '.js'
					}
				]
			}
		}
	} );

	// Default task.
	grunt.registerTask( 'default', ['coffee', 'jshint', 'nodeunit', 'concat', 'uglify'] );
};
