//users sequelize 모델 //users 테이블 정의  //컨트롤러와 middlewear에서 사용
//앱유저
module.exports = (sequelize, Sequelize) => {
  const Puser = sequelize.define("pusers", {
    username: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  return Puser;
};
