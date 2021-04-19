//users sequelize 모델 //users 테이블 정의  //컨트롤러와 middlewear에서 사용
module.exports = (sequelize, Sequelize) => {
  //선생님 정보를 저장하는 DB 모델 구성
  const Tuser = sequelize.define("teacherinfos", {
    userid: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    username: {
      type: Sequelize.STRING,
    },
    usertell: {
      type: Sequelize.STRING,
    },
    userschool: {
      type: Sequelize.STRING,
    },
    userposition: {
      type: Sequelize.STRING,
    },
  });
  return Tuser;
};
