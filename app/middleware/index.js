const authJwt = require("./authJwt");
const verifySignUp = require("./verifySignUp");

module.exports = {
  authJwt,
  verifySignUp,
}; //이 authJwt 객체와 verifySignUp 객체를 다른 js에서 import 할수 있게 만들어준다.
