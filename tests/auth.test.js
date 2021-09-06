const { login, register } = require("../src/controller/auth");
const sinon = require("sinon");
const supertest = require("supertest");
const { APP_URL } = process.env;
const { expect, should, assert } = require("chai");
const { response } = require("../src/helpers/standardResponse");

const mockingResponse = () => {
  const res = {};
  res.status = sinon.stub().returns(res);
  res.json = sinon.stub().returns(res);
  return res;
};

describe("Auth: Login function", () => {
  it("wrong email and password", () => {
    let req = {
      body: {
        email: "miawaug@mail.com",
        password: "123qwe",
      },
    };

    let res = mockingResponse();

    const res = mockingResponse();
    login(req, res)
      .then((data) => {
        expect(data.json.args[0][0].success).to.be.false;
        expect(data.json.args[0][0].message).equal("email not found");
        expect(data.status.args[0][0]).equal(400);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
