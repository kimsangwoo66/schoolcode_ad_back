const db = require("../models");
const config = require("../config/auth.config");
//const User = db.user;
const Role = db.role;

//const Puser = db.puser; //폰유저 객체 생성
const Tuser = db.tuser; //선생님 유저 객체 생성
const Ntable = db.ntable;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); //단방향 암호화 패키지 사용 , 해쉬함수를통해 암호화

/*exports.signup = (req, res) => {
  // DB에 새 user 생성
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8), //bcrypt 를 통해 암호화
    school: req.body.school,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "회원가입에 성공했습니다!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "회원가입에 성공했습니다!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}; */

exports.signin = (req, res) => {
  User.findOne({
    //입력한 사용자 이름이 db에 있는지 찾는다.
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "아이디가 존재하지 않습니다." });
      }
      //비밀번호 확인 검사
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        //비밀번호가 일치하지 않는 경우
        return res.status(401).send({
          accessToken: null,
          message: "비밀번호가 틀립니다.",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        //bcrypt 암호가 정확하면 jwt 토큰 생성
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          //사용자 정보 및 엑세스 토큰 반환
          id: user.id,
          username: user.username,
          email: user.email,
          school: user.school,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      //실패시 오류 메시지
      res.status(500).send({ message: err.message });
    });
};

/*exports.psignup = (req, res) => {
  //모바일 사용자 회원가입 등록
  // DB에 새 user 생성
  Puser.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8), //bcrypt 를 통해 암호화
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "회원가입에 성공했습니다!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "회원가입에 성공했습니다!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}; */

exports.tsignup = (req, res) => {
  //선생님 웹 사용자 회원가입 등록
  // DB에 새 user 생성
  Tuser.create({
    userid: req.body.userid,
    password: bcrypt.hashSync(req.body.password, 8), //bcrypt 를 통해 암호화
    username: req.body.username,
    usertell: req.body.usertell,
    userschool: req.body.userschool,
    userposition: req.body.userposition,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "회원가입에 성공했습니다!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "회원가입에 성공했습니다!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message }); //서버 코드에 문제가 있을경우의 에러메시지
    });
};

exports.tsignin = (req, res) => {
  Tuser.findOne({
    //입력한 아이디가 선생님 테이블 안에 있는지 찾음
    where: {
      userid: req.body.userid,
    },
  })
    .then((user) => {
      if (!user) {
        //사용자가 없을경우 사용자를 찾을 수없다는 console 메시지
        return res.status(404).send({ message: "User Not found." });
      }
      //비밀번호 복호화 및 검증 메소드
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        //비밀번호가 일치하지 않는 경우
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        //bcrypt 암호가 정확하면 jwt 토큰 생성
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          //사용자 정보 및 엑세스 토큰 반환
          userid: user.userid,
          username: user.username,
          usertell: user.usertell,
          userschool: user.userschool,
          userposition: user.userposition,
          //roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      //실패시 오류 메시지
      res.status(500).send({ message: err.message });
    });
};

exports.noticeup = (req, res) => {
  //공지사항 게시판 입력 완료후 게시판 업데이트 및
  //DB에 저장된 공지사항 화면에 띄우기 ...아직미완 프론트엔드 재 구성
  Ntable.create({
    noticetitle: req.body.noticetitle,
    username: req.body.username,
    userposition: req.body.userposition,
    noticecontent: req.body.userposition,
    openrange: req.body.openrange,
  });

  res
    .status(200)
    .send({
      noticetitle: noticetitle,
      username: username,
      userposition: userposition,
      noticecontent: noticecontent,
      openrange: openrange,
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
