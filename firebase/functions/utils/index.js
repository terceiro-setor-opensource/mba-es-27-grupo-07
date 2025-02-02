const applyMiddlewares = (middlewares, handler) => (req, res) => {
  const runMiddlewares = (index) => {
    if (index < middlewares.length) {
      middlewares[index](req, res, () => runMiddlewares(index + 1));
    } else {
      handler(req, res);
    }
  };
  runMiddlewares(0);
};

module.exports = {
  applyMiddlewares,
};
