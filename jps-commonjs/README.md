# jps.rest

The best commonjs module ever.

## Getting Started
### On the server
Install the module with: `npm install jpsrest`

```javascript
var jpsrest = require('jpsrest');
jpsrest.awesome(); // "awesome"
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com//jpsrest/master/dist/jpsrest.min.js
[max]: https://raw.github.com//jpsrest/master/dist/jpsrest.js

In your web page:


    <script src="dist/jpsrest.min.js"></script>
    <script>
    awesome(); // "awesome"
    </script>


In your code, you can attach jpsrest's methods to any object.
    
   
    <script>
    var exports = Yeoman.utils;
    </script>
    <script src="dist/jpsrest.min.js"></script>
    <script>
    Yeoman.utils.awesome(); // "awesome"
    </script>


## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via Grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
 
 Copyright (c) 2014 . Licensed under the MIT license.
