While we rely on several other tools to collaborate, like IM and SCRUM, **the issue queue is the single most important place for taking part in our discussions**. The two main corner stones to have successful deliveries are;

* **Issue queues** are the authoritative history of a project: once all the whiteboards have been cleaned up and the chat logs purged, the only thing we know will be there, alongside commit logs, is our history of issues and their comments.
* **Milestones** on the other hand is here to remind us the big picture that a bucket of issues are solving. They are close to user stories and define what a sprint is trying to achieve.

Note that the following is applicable to all type of communication;

### Format

Almost all efficient messages are structured in the following way:

* **Context**: we here depict the conditions which lead us to writing this message. For example: "Since we've moved to the latest version of Express.js, we've experienced a few performance issues (#14 and #15) on production."
    
* **Problem or idea**: the context should lead to something. An idea perhaps, or an issue you are facing. For example: "We've had no way of easily see the performance impact before releasing our changes to production".
    
* **Solution or next step**: this is where you try and move forward. You can engage others (request of feedback), assign somebody else to take over the issue or simply leave it for further investigation, but **you absolutely need to describe what the next step is**. If you have suggestions or ideas on how to approach the issue, this is the place to write them down.

This last point is the most important, and often most disregarded, aspect of an issue thread. This is the seed of collaboration; omitting it is seriously hindering your chances of seeing others getting engaged.

### Guidelines

* **Short and self-descriptive titles**: people's attention is hard to capture, even your colleaguess. You want to keep the title, which is the most obviously visible part of your issue in the issue queue, to be short and on point. "Refactoring the plugins structure to take into account changes in the Express.js library" is not a title, it's almost the issue message itself. "Plugins structure refactoring" is enough.
* **Stay clear and concise**: keep your messages as short and on point as possible. Bullet points are often a great way of quickly structuring complex ideas or solutions.
* **Add links to you references**: making references is gre you refer to something 
* **Format your messages**: it's easy enough to properly format your content. Important parts of your sentence may need to be bold, list of suggestions may be better displayed as bullet points, ...
* **Include the right people in your discussion**: if you want to catch the attention of others on an issue they are assigned to.

## Issues

Before we take a look at how to write good issues, let's state a few things:

* **Issue queues should mirror your thought process**. They are where you project and structure your ideas, with others or alone.
* **The issue queue is where the heavy part of collaboration is done**. Other form of communication (verbal discussions, IM, email...) should happen after having explored and argued for things in an issue. This ensures that everybody involved had a chance to expose and review the arguments in a clean, structured and (as much as possible) objective manner. The more real time the discussion, the more likely it is to be charged with emotions.
* **Issues should focus on ideas, problems and solutions, they are not activity trackers**. You may notify others that you are grabbing an issue, or committing a patch, though other forms of communication (IM) and commit messages are likely candidates for stating these things.

## Milestones

Milestones are designed to defined the objectives of a sprint. Milestones are built taking into account the following;

* **Milestones are a deliverable**, they are covering a list of issues and define a specific feature or set of features that are an actual delivery.
* **Issues are not added to a milestones after the sprint is started**, we can remove some issues in order to hit the milestone but we **do not** add any.
* **It can be seen as a user story** as it does support a delivery, a user story is usually attached to it and allow the validation of the milestone.
* **All sprints have a milestone** and **all issues are bind to a milestone**, this allow to make sure we always know what and when we will deliver.