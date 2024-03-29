Once we've identified an opportunity as "Qualified" (see *[[How to track contacts & opportunities?]] and [[Our sales workflow]]), we most likely need to produce a proposal to the client. This takes a few steps;

1. **Share all resources from the client**. You can save all the documents received up that point (e.g. wireframes, requirements, user interviews, strategy brief...) into a Google Docs folder (`WCL Business › Projects › CLIENT_NAME › Resources`).
1. (Optional) **Send forms to client**
1. **Prepare the estimate and proposal documents** on Google Docs. You can copy the templates;
  - **[The estimate](https://docs.google.com/spreadsheets/d/1Rm5sLyNRPfyAHSn1fFT3pDI0DaQz4rrcC-iGvL5uYXg/edit#gid=0)** is a simple spreadsheet that allows us to list and describe the features/deliverables for the project. We then associate a work load in days to each item, which gives us the cost. More on that below.
  - **[The proposal](https://docs.google.com/document/d/1G-85aBaMfkWUFGV8QSgKLYD-jpbOBJy6EO9cSdBHvN4/edit#heading=h.gunwswcnh42l)** is a much larger document that we deliver to the client. While it includes the estimate information, it also gives an overview of the company, team, strategy, portfolio...
1. **Create a GitHub issue** that you'll assign to the person on the team who will prepare the estimate. To make this easy on him/her to it done, you should give as much context to it ([example of this](https://github.com/Wiredcraft/sales/issues/59));
  - A summary of who the client is and what he wants to build,
  - A list of links to the resources along with a short description,
  - Links to the proposal and estimate documents on Google Docs
1. **Assign the issue to the proper person**. Depending on the nature of the project, you may want to send this to a project manager, a developer or a designer. When in doubt, ask on Slack who can tackle it.

You'll notice that the way we go at estimating projects is pretty simple. A few things about it;

- **There are recurrent items in most projects**. Things like QA, documentation, testing, project launch, ...
- **The hard part is to identify what the features are and describe them concisely**. Once this is done, estimating the work load is pretty easy,
- **We estimate in man/days but don't get hung up on the details**. In the end, this process is mostly there to:
  - Ensure we are not underestimating certain aspects of the project (*aka* "losing money"),
  - Have a simple medium to communicate our assumptions to the client.
- **We often end up tweaking the budget a lot** either to fit the client's resources or our gut feeling with regards to overall difficulty of the project. Projects always have a lot of imponderables, estimates are all about finding a compromise between what the client can afford and what we feel comfortable getting engaged for.

Once the estimate is done, you should finalize the proposal you'll send over to the client;

1. **Drop the budget** from the estimate into the "Budget" section. In some cases, it is better to split this section in several sub-budgets for each main milestone/deliverable and give an "Overview" budget.
1. **Fill in the details; title, context...**. These should mostly be well understood at that stage as you've probably done most of the work when you created the GitHub issue.
1. **Add a strategy**. This is often a crucial part of the proposal; you may need to refer to existing resources (e.g. [How we design products](https://wiredcraft.com/blog/how-we-design-products/)) and/or work with the person who prepared the estimate to get . Some of our larger projects (e.g. [Myanmar elections](https://drive.google.com/a/wiredcraft.com/file/d/0B1cjUQNjdmJMamxIRWRLekk2eVU/view)) feature an extensive strategy with a lot of details and schemas detailing the architecture, technical stack, user flow...
1. (Optional) **"The Wiredcraft advantage"**; we sometimes include a section that explains why our team is a particularly good fit. More often than not, we mention projects that are very similar or demonstrate skills crucial to the project.
1. **Share it with the client**; once you've double-checked everything with the rest of the team, you can share it as a view-only Google Doc with the client (or alternatively send it as a PDF).