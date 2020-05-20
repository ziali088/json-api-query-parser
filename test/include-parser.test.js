const { expect } = require('chai');
const { includeParser } = require('../index');

describe('IncludeParser', () => {
  it('can parse include string with only top level relation', () => {
    expect(includeParser('relation')).to.deep.eq({
      relation: [],
    });
  });

  it('can parse include string with a depth of one relation', () => {
    expect(includeParser('relation.nested')).to.deep.eq({
      relation: ['nested'],
    });
  });

  it('can parse include string with a depth of two relations', () => {
    expect(includeParser('relation.nested.deep')).to.deep.eq({
      relation: [{ nested: ['deep'] }],
    });
  });

  it('can parse include string with a depth of three relations', () => {
    expect(includeParser('relation.nested.deep.ohgosh')).to.deep.eq({
      relation: [{ nested: [{ deep: ['ohgosh'] }] }],
    });
  });

  it('can parse include string with multiple different relations', () => {
    expect(includeParser('single,relation.nested.deep.ohgosh')).to.deep.eq({
      relation: [{ nested: [{ deep: ['ohgosh'] }] }],
      single: [],
    });
  });

  it('can parse include string with multiple same relations', () => {
    expect(includeParser('relation.foo,relation.bar')).to.deep.eq({
      relation: ['foo', 'bar'],
    });
  });

  it('can parse include string with multiple same relations deeply', () => {
    expect(includeParser('relation.foo,relation.bar.baz')).to.deep.eq({
      relation: ['foo', { bar: ['baz'] }],
    });
  });

  it('can parse include string with multiple same relations all having deep includes', () => {
    expect(includeParser('relation.foo.qux,relation.bar.baz,single')).to.deep.eq({
      relation: [{ foo: ['qux'] }, { bar: ['baz'] }],
      single: [],
    });
  });
});
