module.exports = {
  //mysql 데이터베이스 구성 및 sequelize 화
  HOST: "localhost",
  USER: "root",
  PASSWORD: "1111",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    //pool 구성은 선택 사항
    max: 5, //동시에 접속할 수있는 최대 인원
    min: 0, //pool의 최소 연결수
    acquire: 30000, // 오류가 발생하기전에 pool이 연결을 시도하는 최대 시간
    idle: 10000, //연결 해제 되기 전의 유효 연결 상태 시간
  },
};
