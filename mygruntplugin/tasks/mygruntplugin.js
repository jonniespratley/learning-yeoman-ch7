'use strict';
module.exports = function(grunt) {
	function LearningYeomanCh8() {

		//Default options
		var options = this.options({
			template: 'Hello <%= name %>',
			data: {
				name: 'Learning Yeoman'
			}
		});

		//Handle checking source files
		var checkFiles = function(filepath) {
			if (!grunt.file.exists(filepath)) {
				grunt.log.warn('Source file "' + filepath + '" not found.');
				return false;
			}
			else {
				return true;
			}
		};

		//Handle reading source files
		var readSource = function(file) {
			return file.src.filter(checkFiles).map(function(filepath) {
				return grunt.file.read(filepath);
			}).join(grunt.util.normalizelf(''));
		};

		//Handle reading and writing file
		var readWriteFile = function(file) {
			var src = readSource(file);
			src += grunt.template.process(
			options.template, {
				data: options.data
			});
			grunt.file.write(file.dest, src);
			grunt.log.writeln('File "' + file.dest + '" created.');
		};

		// Iterate over all specified file groups.
		this.files.forEach(function(file) {
			readWriteFile(file);
		});
	}
	grunt.registerMultiTask('learning_yeoman_ch8', 'This is an example plugin.', LearningYeomanCh8);
};