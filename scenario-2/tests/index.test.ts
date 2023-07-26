/// <reference types="@types/jest" />
import binarySearchNumbers from "../src/index";

describe("binarySearchNumbers", () => {
  it("should return the correct index when the searched number is in the array", () => {
    expect(binarySearchNumbers([1,2,3,4,5,6], 3)).toBe(2);
    expect(binarySearchNumbers([1,2,3,4,5,6], 2)).toBe(1);
    expect(binarySearchNumbers([1,2,3,4,5,6], 6)).toBe(5);
    expect(binarySearchNumbers([1,2,3,4,5,6,7,8,9], 8)).toBe(7);
  });

  it("should return -1 when the searched number is not in the array", () => {
    expect(binarySearchNumbers([1,2,3,4,5,6], 7)).toBe(-1);
  });
});