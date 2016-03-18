var gollum = require('node-gollum'),
    path = require('path');

var wikiDirectory = path.join(__dirname, 'wiki');

// directory, port
gollum(wikiDirectory, 3000);
