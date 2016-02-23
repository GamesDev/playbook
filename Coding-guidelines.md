### General rules

- No trailing whitespace.
- Keep lines under 80 characters:
  - Add ruler to your editor to help with this. For example in Eclipse:
    `Preferences → General → Editors → Text Editors → Show print margin`
  - Exceptions allowed when good reason.

### JS

- Tool: we use [JSCS](http://jscs.info/)
- Style: we use the [Airbnb](https://github.com/airbnb/javascript) preset with a few additions, i.e:

    ```json
    {
       "disallowEmptyBlocks": false,
       "disallowTrailingComma": true,
       "preset": "airbnb",
       "requireCamelCaseOrUpperCaseIdentifiers": false,
       "requirePaddingNewLinesAfterBlocks": false,
       "requireTrailingComma": false,
       "safeContextKeyword": ["self"]
    }
    ```

    Always put this in a `.jscsrc` file for a JS project.

### CSS

- Soft-tabs with a two spaces indent.
- No trailing whitespace.
- Opening braces go on the same line.
- One space after `:` and no space before in property declarations.
- One space before `{` in rule declarations.
- Use hexadecimal color codes (e.g. `#000` and not `black`) unless using rgba code (e.g. `rgba(0, 0, 0, 1)`).
- Use `/* */` for comment blocks (instead of `//`).
- Order attributes alphabetically.
- When possible, use [Sass](http://sass-lang.com) + [Compass](http://compass-style.org).

An example of valid CSS:

    /* Header */
    #header {
      background: #000;
      color: #fff;
      width: 100%;
    }

### HTML

- Soft-tabs with a two spaces indent.
- No trailing whitespace.
- No indent for `<html>`, `<head>` or `<body>`.
- Single quotes for element attributes.
- Class and ID names should be as short as possible, and use dash to separate words (as opposed to CamelCase).

An example of valid HTML:

    <!DOCTYPE html>
    <html>
    <head>
      <title>devo.ps</title>
    </head>
    <body>
      <h1 id='title'>Hello there!</h1>
      <p class='empty-text'>This is an empty text, boo.</p>
    <body>
    </html>

### Python

-  Be pythonic ([Zen of Python](https://python-guide.readthedocs.org/en/latest/writing/style/#zen-of-python)):

    > Beautiful is better than ugly.
    > Explicit is better than implicit.
    > Simple is better than complex.
    > Complex is better than complicated.
    > Flat is better than nested.
    > Sparse is better than dense.
    > Readability counts.
    > Special cases aren't special enough to break the rules.
    > Although practicality beats purity.
    > Errors should never pass silently.
    > Unless explicitly silenced.
    > In the face of ambiguity, refuse the temptation to guess.
    > There should be one-- and preferably only one --obvious way to do it.
    > Although that way may not be obvious at first unless you're Dutch.
    > Now is better than never.
    > Although never is often better than *right* now.
    > If the implementation is hard to explain, it's a bad idea.
    > If the implementation is easy to explain, it may be a good idea.
    > Namespaces are one honking great idea -- let's do more of those!

-  Write readable code ([Code Style](https://python-guide.readthedocs.org/en/latest/writing/style.html))
-  Follow [PEP8](http://www.python.org/dev/peps/pep-0008) guidelines in general with following exception. PEP8 has good document with short explanations, read it and keep it around.
  -  Exception to PEP8: (E501) Line length (try to avoid long lines, but sometimes they are acceptable)
-  Use empty lines to separate logically grouped lines of code from each other (within same function or method).
-  Never use tabs, use 4-spaces instead (configurable in most editors)
-  Logging:
  -  Use `logger.exception(msg)` to log exceptions inside `except` (prints stack trace of the exception)
  -  Use `debug` level for log-entries that should not raise attention
  -  Use `warning` level for log-entries that should not happen (but not critical). Warning-level logged issues should be fixed or downgraded to debug-level.
  -  Use `error` level to log events that refer to critical problem with the code (should raise immediate attention on production).
-  Use single-quotation characters to define strings: `str = 'teststring'`
-  Write short (one line) comments for every function or method
  -  Unless it is very simple and self explaining
  -  In complex functions/methods write more detailed multi-line comment describing arguments and return values.

#### Testing 

- Folder structure
  - Place your unittests to a `tests` folder in the root of the repository.
  - Name the files based on module. Tests for `lib/shazam/ops/job.py` are in `tests/shazam_ops_job.py` file.
- Use `nose` as testrunner
- Update the Makefile to run your tests smoothly
- Use [mock](http://www.voidspace.org.uk/python/mock/).
- Use standard `unittests` framework.
- Avoid doing blocking operations in unittests (mocking helps with this).
- Run unittests before pushing your code!