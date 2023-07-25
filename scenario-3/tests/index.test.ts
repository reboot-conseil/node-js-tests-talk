import generator from '../src/index';

describe('generator', () => {

  it("without start and end specified, should yield an empty array", () => {
    // arrange
    const expected: number[] = [];
    // act
    const actual = generator().next().value;
    // assert
    expect(actual).toEqual(expected);
  });

  it("without start and end specified and a first initialization, should yield undefined", () => {
    // arrange
    const actual = generator();
    // act
    actual.next();
    // assert
    expect(actual.next().value).toBeUndefined();
  });

  it("with start at 0, an end at 3, no step specified, and 2 calls to next, should yield an array with last member 2", () => {
    // arrange
    const expected: number[] = [0,1,2];
    const actual = generator(0,3);
    // act
    actual.next();
    actual.next();
    // assert
    expect(actual.next().value).toEqual(expected);
  });

});