/*
 * jps-nodejs
 * user/repo
 *
 * Copyright (c) 2014 
 * Licensed under the MIT license.
 */

'use strict';

exports.awesome = function() {
    return 'awesome';
};

grunt.initConfig({
    concat: {
        options: {},
        foo: {},
        bar: {
            options: {}
        }
    }
});
grunt.initConfig({
    myTask: {
        staticFiles: {
            files: [{
                src: 'src/myfile.js',
                dest: 'build/myfile.min.js'
            }]
        }
    }
});