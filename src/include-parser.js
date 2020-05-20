const _ = require('lodash');

const includeParser = (param) => {
  const result = {};
  param.split(',').forEach((req) => {
    const relation = req.split('.').shift();
    const relationResources = req.split('.').slice(1);

    if (!_.has(result, relation)) {
      result[relation] = [];
    }

    if (!_.isEmpty(relationResources)) {
      if (relationResources.length === 1) {
        result[relation] = _.union(result[relation], relationResources);
      } else {
        result[relation] = _.union(result[relation], [includeParser(relationResources.join('.'))]);
      }
    }
  });
  return result;
};

module.exports = includeParser;
