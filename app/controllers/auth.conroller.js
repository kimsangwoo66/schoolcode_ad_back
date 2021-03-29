const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs"); //단방향 암호화 패키지 사용 , 해쉬함수를통해 암호화

exports.signup = (req, res) => {
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
};

exports.signin = (req, res) => {
  User.findOne({
    //입력한 사용자 이름이 db에 있는지 찾는다.
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
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
