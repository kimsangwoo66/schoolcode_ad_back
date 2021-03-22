exports.allAccess = (req, res) => {
  res.status(200).send("모든 사용자 공개 내용.");
};

exports.userBoard = (req, res) => {
  //사용자, 운영자 ,관리자
  res.status(200).send("사용자 공개 내용");
};

exports.adminBoard = (req, res) => {
  //관리자 권한을 가진 user
  res.status(200).send("관리자 공개 내용.");
};

exports.moderatorBoard = (req, res) => {
  //중재자 권한을 가진 user
  res.status(200).send("Moderator Content.");
};
