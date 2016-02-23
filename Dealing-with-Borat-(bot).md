	 ______     ______     ______     ______     ______  
	/\  == \   /\  __ \   /\  == \   /\  __ \   /\__  _\ 
	\ \  __<   \ \ \/\ \  \ \  __<   \ \  __ \  \/_/\ \/ 
 	 \ \_____\  \ \_____\  \ \_\ \_\  \ \_\ \_\    \ \_\ 
  	  \/_____/   \/_____/   \/_/ /_/   \/_/\/_/     \/_/ 

### What is Borat?
Borat is the [bot](http://hubot.github.com/) for our Wiredcraft Jabber service. We use it for automation! When its ready it should tell us when our builds are successful (or fail), keep our dashboard up to date, and anything else we or you want it to do.

### Adding to Borat
To add features to Borat you write new scripts in either Coffeescript or Javascript and add them into Borat's scripts folder. At the moment in order to load a new script Borat must be killed and started again.

Each script should start with a [TomDoc](http://tomdoc.org/) [(example)](https://github.com/github/hubot-scripts/blob/master/src/scripts/speak.coffee#L1-15), as this is where we can see dependencies and `borat help` commands are pulled from these headers. If there are no dependencies be sure to include `none` instead of leaving it blank. If your script does have dependencies, be sure to add them not only in the TomDoc, but also in the `package.json` file.

If you're considering writing your own script check out [this repo](https://github.com/github/hubot-scripts) for ideas and examples. Also someone might have already wrote the same script and uploaded it there.