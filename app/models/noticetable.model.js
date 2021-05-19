module.exports = (sequelize, Sequelize) => {
  //공지사항 sequelize 모델 구성
  const Noticetable = sequelize.define("noticetables", {
    noticetitle: {
      type: Sequelize.STRING,
    },
    userename: {
      type: Sequelize.STRING,
    },
    userposition: {
      type: Sequelize.STRING,
    },
    noticecontent: {
      type: Sequelize.STRING,
    },
    openrange: {
      type: Sequelize.STRING,
    },
  });
  return Noticetable;
};
