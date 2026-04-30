// ============================================================
// Design Pattern 5: Chain of Responsibility (Middleware)
// ============================================================
// Problem: Every API request needs authentication, logging, and
// input validation — but these are different concerns that should
// not be mixed into one place.
//
// Solution: Each concern is a separate middleware function. Express
// chains them in order — each one does its job and calls next() to
// pass control to the next handler. If one fails (e.g. auth), the
// chain stops immediately and the controller is never reached.
//
// Chain on POST /api/expenses:
//   loggerMiddleware → protect (auth) → validateExpense → createExpense
// ============================================================

const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} — ${req.ip}`);
  next(); // pass to next handler in the chain
};

module.exports = { loggerMiddleware };
