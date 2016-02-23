*Explaining how we should organize marketing around the launch of our OSS code (node.js modules...)*

# Communication Channels

- (Generalist) Links for developers : http://www.dzone.com/
- (Javascript) HN like : http://www.echojs.com/
- (Javascript) Newsletter : http://contact.dailyjs.com/
- (Javascript) Newsletter : http://javascriptweekly.com/ (contact http://peterc.org/)
- (Social) Twitter

# Licenses

*Todo*

# Recomendations

## ``UX``

At a discovery stage (when you communicate a project) developers are impatient because they don't need your tool. They need to have a quick feedback and a fast way to play with it.

So your documentation should include, at least, a Quickstart section which includes Installation + Usage/Example.

## Tests

[![Build Status](https://travis-ci.org/Unitech/pm2.png)](https://travis-ci.org/Unitech/pm2)

An OpenSource project always have to include tests. Always... If not, developers will not trust it.
Travis CI is a very convenient way to test your code, just add a .travis.yml to your project.

Build configuration : http://about.travis-ci.org/docs/user/build-configuration/

Example for Node : https://github.com/Unitech/pm2/blob/master/.travis.yml

For Node project, your package.json should include the ``test`` rule in the ``script`` section. 
Travis will launch your tests by typing ``npm test`` 

## Badges

Putting badges to your README.md permits developers to keep track of the project health state.
And when everything is alright, they all are green, developers will trust it.

[![Build Status](https://travis-ci.org/Unitech/pm2.png)](https://travis-ci.org/Unitech/pm2)
[![Build Status](https://david-dm.org/Unitech/pm2.png)](https://david-dm.org/Unitech/pm2)
[![NPM version](https://badge.fury.io/js/pm2.png)](http://badge.fury.io/js/pm2)

- Module version : https://badge.fury.io/
- Dependencies status : https://david-dm.org/
- Travis CI : https://travis-ci.org/Unitech/pm2

## Logo/Pictures

As Substack do, adding a logo is quite efficient. 

![multimeter](http://substack.net/images/multimeter.png)

It's a little piece of happiness between strong concepts/code.

Examples : 

- https://github.com/substack/node-multimeter
- https://github.com/Unitech/pm2

If your project have a visual feedback (sorry backend developers :p), don't forget to add screenshoots to your README.md. 
To link pictures in your README you have to use this link :

```
https://github.com/unitech/pm2/raw/master/pres/pm2-list.png
```

## Dealing with contributors and issues

*Todo*

Always test pulled requests before merging to the master branch, travisCI test pull request, just check their dashboard.

Always answer to people.

## NPM modules

Before publishing, your package.json should contain all the data needed.
Here is a sample :

```javascript
{                                                                                                                                                                                                                                              
  "name": "pm2",
  "preferGlobal": "true",
  "version": "0.4.2",
  "engines" : {
    "node" : ">=0.8"
  },
  "homepage" : "http://unitech.io/",
  "description": "The next generation process manager for Node.js with native clusterization",
  "main": "index.js",
  "scripts": {
    "test": "bash ./test/cli.sh ; NODE_ENV=test ./node_modules/mocha/bin/mocha test",
    "froze": "npm shrinkwrap"
  },
  "keywords": [       // Put a lot of keywords
    "cli",
    "fault tolerant",
    "sysadmin"
  ],
  "bin": {
    "pm2": "./bin/pm2"
  },
  "dependencies": {
    "commander": "1.1.0"
  },
  "devDependencies": {
    "mocha": "1.x",
    "should": "1.x",
    "better-assert" : "*"
  },
  "repository": {
    "type" : "git",
    "url" : "git://github.com/MYREPO"
  },
  "author": {
    "name": "MYNAME",
    "email": "MYEMAIL",
    "url": "http://apps.hemca.com"
  },
  "license": "MIT"
}

``` 