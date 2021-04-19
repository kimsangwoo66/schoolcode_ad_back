const config = require("../config/db.config");
const Sequelize = require("sequelize");
//mysql을 편리하게 사용할 수있는 라이브러리
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: 0,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db.user = require("../models/user.model")(sequelize, Sequelize);
//db.role = require("../models/role.model")(sequelize, Sequelize);
//db.puser = require("../models/puser.model")(sequelize, Sequelize); //앱 유저
db.tuser = require("../models/tuser.model")(sequelize, Sequelize); //웹 선생님 유저
db.trole = require("../models/role.model")(sequelize, Sequelize);

//user 테이블과 role테이블의 외래키와 기본키를 이용해 새로운 관계를 나타낸 user_roles 테이블 생성
/*db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignkey: "roleId",
  otherkey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignkey: "userId",
  otherkey: "roleId",
});
*/

db.trole.belongsToMany(db.tuser, {
  //시퀄라이즈로 관계데이터베이스 테이블 구성 방법
  through: "user_roles",
  foreignkey: "roleId",
  otherkey: "userId",
});

db.tuser.belongsToMany(db.trole, {
  through: "user_roles",
  foreignkey: "userId",
  otherkey: "roleId",
});

//사용자와 역활은 다대다 관계
db.ROLES = ["user", "admin", "moderator"];

module.exports = db; //db 객체를 다른 js에서 불러오게 할수있게 내보내준다.
