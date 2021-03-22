const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.conroller");

//post 가입 및 로그인
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup //회원가입 메소드 호출
  );

  app.post("/api/auth/signin", controller.signin); //로그인 메소드 호출
};