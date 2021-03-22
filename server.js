//express 웹 서버 설정한다.
const express = require("express"); //rest API 를 구축하기위한 패키지, require기능은 module.exports 를 리턴한다.
const bodyParser = require("body-parser"); //요청을 구문 분석하고 req.body 객체를 생성하는 패키지
const cors = require("cors"); //node.js express 미들웨어 cors 패키지, cors를 활성화 하는데 필요

const app = express();

var corsOptions = {
  origin: "http://localhost:8081", //포트 설정
};

app.use(cors(corsOptions));

//parse 요청 content-type
app.use(bodyParser.json());

//parse 요청 content-type appication/x-www-form-rlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//db
const db = require("./app/models");
const Role = db.role;

//db.sequelize.sync(); 테이블이 삭제 안되고 계속 유지 ...
//프로덕션의 경우 이러한 행을 수동으로 삽입하고 sync()매개 변수없이 사용 하여 데이터 삭제를 방지

db.sequelize.sync({ force: true }).then(() => {
  //새로 서버를 실행할때마다 DB 초기화
  console.log(`Drop and Resync Database with {force: true}`);
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "welcome to sangwoo application." });
});

//routes
require("./app/routes/auth.routes.js")(app);
require("./app/routes/user.routes")(app);

//포트 정하기 , 요청에 응답
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
app.use;
