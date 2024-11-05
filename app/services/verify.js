const verify = (req, res) => {
  return res.status(200).json({
    message: "Token is valid",
    user: req.user,
  });
};

module.exports = verify;
