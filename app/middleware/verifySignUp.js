const db = require("../models");
const ROLES = db.ROLES;
//const User = db.user;
const Tuser = db.tuser;
//사용자 이름 또는 이메일 중복여부 , 역활 존재 여부 확인
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // 유저이름
  Tuser.findOne({
    where: {
      //선생님 정보 테이블에 중복된이름이 존재하는지 확인
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!",
      });
      return;
    }

    // 이메일
    /*User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!",
        });
        return;
      }

      next();
    }); */

    //선생님 아이디
    Tuser.findOne({
      where: {
        userid: req.body.userid, //중복된 선생님 아이디가 존재하는지 확인
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "아이디가 이미 존재합니다.",
        });
        return;
      }

      next();
    });
  });
};
//권한 설정검사

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
};

module.exports = verifySignUp;
