// const { assert } = require("assert");
// const { expect } = require("chai");
const should = require("chai").should();

let greetings = "hello";

describe("This is example test", () => {
  it("greeting variable type should be a string", () => {
    greetings.should.to.be.a("string");
  });
  it("greetings variable value should be hello", () => {
    // assert.equal(2 + 2, 4);
    // expect(2 + 2).equal(4);
    greetings.should.to.be.equal("hello");
  });
});
