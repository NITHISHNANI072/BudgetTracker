// Design Pattern 5: Chain of Responsibility (Middleware)
// Each middleware handles one responsibility and passes control to next().
// The chain on expense/income routes is:
//   loggerMiddleware → protect (auth) → validateEntry → controller

const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // pass to next handler in chain
};

module.exports = { loggerMiddleware };
