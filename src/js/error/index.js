const handleError = (err, customMessage) => {
  console.log(customMessage, err);
  throw err;
};

module.exports = { handleError };
