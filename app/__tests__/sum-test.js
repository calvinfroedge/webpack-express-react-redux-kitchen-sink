jest.autoMockOff();

describe('sum', function(){
  it('adds 1+2 to equal 3', function(){
    var sum = require('../sum').default;
    expect(sum(1,2)).toBe(3);
  });
});
