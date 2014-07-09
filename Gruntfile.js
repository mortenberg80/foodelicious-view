/*jshint node:true*/
'use strict';

module.exports = function(grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	var apiProxyMiddleware = require('./tasks/lib/proxyMiddleware');

	// configurable paths
	var appPaths = {
		app: '.',
	};

	grunt.initConfig({
		appConfig: appPaths,

		pkg: grunt.file.readJSON('package.json'),

		connect: {
			server: {
				options: {
					port: 8090,
					base: '.',
					keepalive: true,
					middleware: function(connect, options) {
						return [
							apiProxyMiddleware('http://localhost:8080', '/foodelicious'),
							connect.static(options.base)
						];
					}
				},
			}
		},
		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},
		watch: {
			options: {
				livereload: true,
			},
			jshint: {
				files: '<%= jshint.all %>',
				tasks: ['jshint']
			},
			livereload: {
				options: {
					livereload: true
				},
				files: [
					'<%= appConfig.app %>/*.html',
					'<%= appConfig.app %>/views/partials/*.html',
					'{.tmp,<%= appConfig.app %>}/css/**/*.css',
					'{.tmp,<%= appConfig.app %>}/js/**/*.js',
					'<%= appConfig.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
				]
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				force: true
			},
			all: [
				'Gruntfile.js',
				'<%= appConfig.app %>/js/controllers.js',
				'<%= appConfig.app %>/js/module.js',
			]
		},
	});

	grunt.registerTask('server', function (target) {
		grunt.task.run([
			'connect:server',
			'watch'
		]);
	});
};
