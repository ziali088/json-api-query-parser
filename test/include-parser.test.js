const { expect } = require('chai');
const { includeParser } = require('../index');

describe('IncludeParser', () => {
  it('can parse include string with only top level relation', () => {
    expect(includeParser('relation')).to.deep.eq({
      relation: []
    });
  });

  it('can parse include string with a depth of one relation', () => {
    expect(includeParser('relation.nested')).to.deep.eq({
      relation: ['nested']
    });
  });

  it('can parse include string with a depth of two relations', () => {
    expect(includeParser('relation.nested.deep')).to.deep.eq({
      relation: [{ nested: ['deep'] }]
    });
  });

  it('can parse include string with a depth of three relations', () => {
    expect(includeParser('relation.nested.deep.ohgosh')).to.deep.eq({
      relation: [{ nested: [{ deep: ['ohgosh']}] }]
    });
  });
});