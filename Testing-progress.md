_This document was created as result of [this](https://github.com/Wiredcraft/wiredcraft.github.io/issues/1650#issuecomment-72415160) discussion with the goal of improving our testing practices._

The following table represents current testing progress in our ongoing projects. It is updated weekly by @JuhaS.

|Project             |Backend|Frontend|Automated|Pipeline  |Report   |
|--------------------|:-----:|:------:|:-------:|:--------:|:-------:|
|ChatOps             |   1   |   0    |         |          |         |
|Classydocs          |   0   |   0    |         |          |         |
|CSViz               |   1   |   0    |    x    |          | x(chat) |
|devo.ps             |   1   |   1    |         |          |         |
|Myanmar             |   1   |   0    |         |          |         |
|PayrollChina        |   0   |   1    |         |          |         |
|Sweepboard          |   1   |   0    |         |          |         |
|WRI                 |   1   |   1    |         |          |         |

__Column explanations:__
 - __Backend__: Backend unit tests
 - __Frontend__: Frontend unit tests
 - __Automated__: Tests that run automatically on every commit
 - __Pipeline__: Testing is part of deployment pipeline, if test don't pass the release will abort.
 - __Report__: Testing report is somewhere visible (possibly a dashboard somewhere or in chat).

__Value explanations__: Values are represented in scale of 0 to 2
 - __(-)__: Not applicable (for example if project doesn't have a backend)
 - __zero(0)__: Nothing implemented
 - __zero(1)__: Partially implemented
 - __zero(2)__: Good enough
 - __zero(3)__: Very well implemented
