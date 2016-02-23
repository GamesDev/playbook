So you're new at Wiredcraft and you're trying to figure out what to do, and potentially what not to do. The following page is here to help you figure that out, so let's get started:

## Online tools ("Where do I log in?")

Before starting with what you're supposed to do, you should have been invited to the following platforms, **if not, just ask**:

1. **[Github](http://github.com/Wiredcraft)**: your Github account should have been added to the proper organizations and/or projects. If you're reading this page, you probably already had that one taken care of to some extent. If you are assigned to projects on which you don't have access, just ask one of your colleagues who is, or ask in the internal chat.
1. **[GMail](http://mail.google.com)**: we're using GMail for email, and you should have been assigned an address in the following fashion: `<surname>@wiredcraft.com`. You can log in your account at [http://mail.google.com](http://mail.google.com) with your full email and password as credentials. We also make use of Google Calendar, but that's pretty straightforward. **Having your email open at all times is probably a good idea**.
1. **[Slack](https://slack.com/)**: Sign up to [slack](https://slack.com/) and install the [slack app](https://slack.com/apps) on your phone and computer and ask us to add you to the [Wiredcraft slack team]. There's a general channel for the whole company and individual channels for each project. Slack's where a lot of our discussions happen on a daily basis. 
1. **[Dropbox](http://dropbox.com) (optional)**: you may be invited to some of the company Dropbox shared folders that contain assets for some of our projects, but also a good deal of our internal and legal documents (contracts, employee agreements and a whole range of other fancy things you may not want to know about, unless you're HR or a manager...).
1. **[Base CRM](https://app.futuresimple.com/crm) (optional)**: for managers only, that's where we keep track of all of our clients, their contact information and the ongoing deals and internal discussion around our services.
1. **[Gaug.es](http://gaug.es) & [Google Analytics](http://google.com/analytics/)**: are the analytics we use to track the traffic on all of our sites.
1. **[Mailchimp](http://mailchimp.com)**: is our newsletter and mailing list platform. We handle every single newsletter or list email through it. Create your own account and ask for being added to the list of admin.
1. **[Zapier](http://zapier.com)**: is an automation tool allowing to hook services together in the form of "If X happens on service Y, then trigger A on service B". For example, this allows us to drop mail attachment from job inquiries (likely to be resumes) in the HR folder on Dropbox.
1. **VPN account**: we're operating in China and it's painful as hell without a VPN. We provide a free VPN for each of our employees. Just talk to [Vincent](http://github.com/zbal) and he'll set you up.

## Local setup ("What do I need to install?")

We provide our staff with an Apple laptop (Macbook Air as of late), unless you want to use your own machine. We're not Apple fanboys, we just think they have the best hardware out there (and we like to invest in things that can stay around for a bit). So we usually recommend the following options:

* **[XCode](https://developer.apple.com/xcode/)** is a necessary evil (gcc and all you know). It's a large beast too, so ask your colleagues if they have a copy first if it's not already installed on your machine.
* **[Homebrew](http://mxcl.github.com/homebrew/)** is an awesome package manager for MacOS.
* **[Git](https://help.github.com/articles/set-up-git)** will be pretty much needed for anything you're supposed to do (yeah, even if you're not a programmer). Some of us like using it with the [Github for Mac](http://mac.github.com/).
* **[node.js](http://nodejs.org/)** which powers most of our modern projects. You could set it up using Homebrew, but we recommend you use [the installer linked on the front page of the official page](http://nodejs.org/).
* **[Texmate](http://macromates.com/), [SublimeText](http://www.sublimetext.com/) or [MacVim](http://code.google.com/p/macvim/)** are all viable options for code editing, but really we don't care what you use. As long as you respect or contribute to our coding guidelines (check the *Guides* section of this Wiki).
* **[TunnelBlick](http://code.google.com/p/tunnelblick/)** is an OpenVPN client you'll need to use our company VPN.
* **[Google Chrome](https://www.google.com/intl/en/chrome/browser/)** because that's the best browser out there and is awesome at debugging Javascript, isn't as bloated as Firefox and as rigid as Safari. And it's from freaking Google for god's sake.

One more bit of advice: **we've learnt to expect the code of the projects we're working on to be found in a `~/Workspace` or `~/workspace` folder** (in your home folder). This is where we clone all git repositories and keep code we're hacking. Some people add subfolder for organizations or products, in the case of the "wiredcraft.com" website (related to Wiredcraft): `~/workspace/wiredcraft/wiredcraft.com`.

## Workflow ("How do I use all that crap?")

Work usually goes as following on a day to day basis:

1. You get in the office, fire up TunnelBlick (gotta love the GFW), Github dashboard and Gmail. Check on what's been sent over to you (issues, emails?) and get the coffee on its way.
1. You open up your editor of choice, pull the latest code from the repositories you're working on and start reviewing changes.
1. You can get things started, enjoying the hot beverage of your choice while slaying bugs. The team is always available (at least when they're in the office) on the internal chat. No need to go and disturb somebody you want to ask a question to, just throw him a private message first.
1. You may have to participate in one of the regular scrum meetings, which you should get more familiar with in the [relevant guide page](https://github.com/Wiredcraft/wiredcraft.com/wiki/Our-development-process).
1. More coffee, more food and more chat later you're ready to commit. You may do so on a branch or directly on master, but in any case you are [documenting your progress through Github issues](https://github.com/Wiredcraft/wiredcraft.com/wiki/Writing-issues-and-comments).

If at any point, you run out of nutrient of any kind (coffee, tea, snacks...), just post an issue in the [Wirecraft.com issue queue](https://github.com/Wiredcraft/wiredcraft.com/issues) and we'll get it for you next time we run an order (despite the GFW, China has awesome things like [Taobao](http://taobao.com) that make the whole experience a lot better).

We also encourage you to share as much as you feel like through the different channels: IM and Github are our favorite, email is a bit outdated and not fitted to the kind of discussion we want to have (it's either something worth being captured and kept as an issue/Wiki, or simply can be sorted out through an IM or verbal chat).

You're allowed to freak out, but we're here to help. Just ask if you don't understand, and let us know if you break something: we're careful folks, whatever you think you may have tempered with is probably backed up three times. As some may say "move fast and break things".

We jokingly blame the newest person on the team with anything that goes wrong, so don't freak out if somebody is calling you out for breaking something you haven't even touched: we're playful folks and like to tease our colleagues. Moreover, it helps us make you de-dramatize the act of breaking. If you manage to break something, we're at least half responsible for not making our software resilient enough.