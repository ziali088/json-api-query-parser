# JSON API Query Param Parser

Provides a function to parse the `include` JSON API query parameter into an object.

# Installation

```shell
$ npm i json-api-query-parser
```

# Description

The JSON API specification provides ways to request a resources relations (`include`) via query parameters. These relations are provided as a comma separated string, which this module transforms into an object.

# Usage

```js
const { includeParser } = require('json-api-query-param-parser');

console.dir(includeParser('author'), { depth: null });
// { author: [] }

console.dir(includeParser('author.comments'), { depth: null });
// { author: ['comments'] }

console.dir(includeParser('author.comments.author'), { depth: null });
// { author: [ { comments: ['author'] } ] }

console.dir(includeParser('author.comments,author.books'), { depth: null });
// { author: ['comments', 'books'] }
```

# Functions

## includeParser (String param)

Takes the given param and creates an object representing the relationships requested.

The top level keys of the object represent the direct relations requested and will always have an array value, which will either be empty (meaning only the top level relation was requested) or contain the nested relations that were requested.

# TODO

- Add parser for sparse fieldsets parameters

# Contributing

Bugfixes / feature requests welcome.

Fork the repo and then:

- `npm install`
- `npm test`
- `npm run lint -- --fix`
- Create a Pull Request
