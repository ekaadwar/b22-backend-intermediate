exports.response = (res, status = 200, success = true, message = "This a message", results, pageInfo) => {
  res.status(status).json({
    success,
    message,
    results,
    pageInfo,
  });
};
