const _ = require('lodash');

const includeParser = (param, options = {}) => {
  const result = {};
  if (_.isEmpty(param)) return result;

  let string = param;
  switch (options.convertCase) {
    case 'camelCase':
      string = string.replace(/-(\w)/g, (m, p1) => p1.toUpperCase());
      break;
    default:
      break;
  }

  string.split(',').forEach((req) => {
    const relation = req.split('.').shift();
    const relationResources = req.split('.').slice(1);

    if (!_.has(result, relation)) {
      result[relation] = [];
    }

    if (!_.isEmpty(relationResources)) {
      if (relationResources.length === 1) {
        result[relation] = _.union(result[relation], relationResources);
      } else {
        result[relation] = _.union(result[relation], [includeParser(relationResources.join('.'), options)]);
      }
    }
  });
  return result;
};

module.exports = includeParser;
