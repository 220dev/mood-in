let admin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.send("접근 권한이 없습니다.");
  }
  next();
};

module.exports = { admin };
