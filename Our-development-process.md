### tl;dr (Too long; didn't read)

* **Agile methodology**,
* Every sprint starts with a kick-off scrum:
  * Lasts 30-60 minutes
  * Choose tasks to be included in the sprint backlog (concentrate on deliverables)
  * Collaboratively estimate time needed for each item (planning poker)
* Every sprint ends with a post-mortem:
  * Improve our estimations (compare estimated and actual effort)
  * Improve our scrum process
  * Open brainstorming for any other improvements
* Daily Scrum meeting (15mn max) where each member presents:
  1) What they did since last meeting
  2) What they will do next
  3) Do they have blockers
* **We may review scope through a sprint but milestones are never postponed**.
* User stories and tasks are captured on Github, respectively in the documentation and as issues associated to a milestone.
* We communicate constantly through Github (ticketing and high level coordination) and jabber (project chat room).
* We document first and document continuously through the sprints.
* **We fail fast and publicly, we break stuff and learn from it**.

### Overview

We use primarly an [agile methodology](http://en.wikipedia.org/wiki/Agile_software_development) to drive our development process. We move in fast iterations (sprints), shipping at pre-defined dates (milestones) and maintain high collaboration and transparency across the team.

We believe that moving together as a team, quickly iterating to deliver a working product at a pre-defined (and immuable) date allows us to be more focused and provide better results overall. We also believe that collaboration and communication is key among the team, that is why we encourage it through SCRUM and various other tools.

### Sprints

We organize our development in short sprints of 2 weeks by default. It may happen that we decide to have a slightly longer or smaller sprint (1 or 3 weeks), but should usually try and stick to this 2 weeks default. This allows for the team to have enough data by the end of the first week or beginning of the second one to adapt the target for the end of the sprint (milestone) and ensures some level of visibility to the whole company.

Sprint **always** start and end in the same way:

* The **kick-off meeting** helps determine what the goal of the next milestone is and define the scope of the upcoming sprint. It is then that we review what new features, improvements and bug fixes we will attempt to ship by end of the sprint. It is also a good time to define what does not go into the current sprint and is left for a later phase. All this is captured in Github; first as [user stories](http://en.wikipedia.org/wiki/User_story) in the Github wiki, which may then be referred to by Github issues. Issues are all assigned to a milestone. Out-of-scope issues should be assigned to the proper milestone (usually a catch-all for the milestone after the current one or a bucket-list one).
* The **post-mortem meeting** should be held at the end of each sprint. It follows the actual delivery (milestone + demo + release) and precedes the next sprint's kick-off , often combined with it in the same meeting. It is an occasion for the team to review and discuss what they experienced and learned through the sprint and is an opportunity for them to capture it. This is usually an appropriate moment to raise higer level issue: suggestions on methodology or the project's goal, feedback on new tools or libraries...

### Scrums

Sprints are punctuated by scrum meetings; these short, time-boxed meetings (15 mn max) allow for each team member to get together and answer openly a few questions;

1. What have I done since last time?
2. What am I doing next?
3. What are my potential blockers or issues?

It is important to hold these meetings on a regular basis; preferrably daily, but at the very least every couple of days. The team may call impromptu scrum meetings to deal with a specific set of issue faced through a sprint.

Before each scrum meetings, and prior to any discussion among the group, each team member should be updating his Github issues accordingly and make them available for others to access. **If you're working on something that is not in the issue queue, you're doing it wrong.**

These meetings foster collaboration between team members (when an issue is raised, a team member may have some valuable input for example) and ensures transparency across the board, understand making sure everybody is up to date with what the team as a whole is up to.

### Milestones, Demos & Releases

**Milestones are set dates, marking the end of a sprint, at which the team is supposed to ship** a new version of the product being developed. Milestones are decided during the kick-off meeting of the related sprint and should not be postponed (save for exceptional events). The most important event in a development cycle is the act of shipping; sticking to a date forces the team to make this the natural, expected outcome. To accommodate this aspect, the team is encouraged to discuss and review the scope of the current sprint at scrums meetings; if it is obvious that one of the features can't be shipped with a minimum level of quality, it is preferable for the team to demote this feature to the next sprint and focus on shipping the rest of the scope.

**Once a milestone is reached, the team leading the project is expected to perform a demo of what they have built or learned at the weekly company lunch** (Friday, noon). This demo is not necessarily a full-fledged demonstration of a working software, as some sprintss/products may be focused on elements with low visibility (infrastructure , code optimization, ...) but they should nonetheless be a short presentation (5mn) of what was learned and shipped through the completed sprint.

**Once a milestone is reached, the team may deliver a release, to our clients or customers. This can only happen from Monday through Wednesday**; it is important to ensure that we never release new versions of our softwares on Thursday or Friday as we want to prevent being left with short windows of time to deal with unforeseen bugs or defects.

### Documentation

Documentation is an absolute necessity; no sprint should be started without at least a thorough description of the milestone's goals and scope.

Ideally, each kick-off meeting should ensure that the team has a solid understanding of what the sprint is about. This should however be captured through documentation in the Github wiki associated to the repository of the project. Depending on the specifics of the sprint, it may mean workflow schemas, wireframes, information architecture documents, technical documentation (methods, structures...), etc.

This documentation should be constantly updated and improved through the development cycle and should aim at representing an accurate enough picture of what is being built at any given time.

### Tools

* Github
* Dropbox
* Notebooks & whiteboards