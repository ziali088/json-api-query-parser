const _ = require('lodash');

const includeParser = (param) => {
  let result = {};
  param.split(',').forEach((req) => {
    const relation = req.split('.').shift();
    const relationResources = req.split('.').slice(1);

    if (!_.has(result, relation)) {
      result[relation] = [];
    }

    if (!_.isEmpty(relationResources)) {
      if (relationResources.length === 1 ) {
        result[relation] = relationResources;
      } else {
        result[relation] = [includeParser(relationResources.join('.'))];
      }
    }
    // param = author.comments.author
    /**
     * {
     *  author: [{ comments: ['author'] }]
     * }
     */
  });
  return result;
};

module.exports = includeParser;