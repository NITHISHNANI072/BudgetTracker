// ============================================================
// Design Pattern 4: Builder (Creational)
// ============================================================
// Problem: Filtering expenses requires many optional parameters —
// category, date range, min/max amount. Passing them all as function
// arguments creates confusing, fragile function signatures.
//
// Solution: ExpenseQueryBuilder uses method chaining to construct
// a MongoDB filter object step by step. Each method adds one filter
// and returns `this` so calls can be chained. The final build()
// returns the complete filter ready to pass to Mongoose.
//
// Usage example:
//   const filter = new ExpenseQueryBuilder(userId)
//     .byCategory('Food')
//     .fromDate('2025-01-01')
//     .toDate('2025-06-30')
//     .minAmount(50)
//     .build();
//   const results = await Expense.find(filter);
// ============================================================

const Expense = require('../../models/Expense');

class ExpenseQueryBuilder {
  constructor(userId) {
    this._filter = { userId };
  }

  byCategory(category) {
    if (category) this._filter.category = category;
    return this;
  }

  fromDate(date) {
    if (date) {
      this._filter.date = this._filter.date || {};
      this._filter.date.$gte = new Date(date);
    }
    return this;
  }

  toDate(date) {
    if (date) {
      this._filter.date = this._filter.date || {};
      this._filter.date.$lte = new Date(date);
    }
    return this;
  }

  minAmount(amount) {
    if (amount !== undefined) {
      this._filter.amount = this._filter.amount || {};
      this._filter.amount.$gte = Number(amount);
    }
    return this;
  }

  maxAmount(amount) {
    if (amount !== undefined) {
      this._filter.amount = this._filter.amount || {};
      this._filter.amount.$lte = Number(amount);
    }
    return this;
  }

  build() {
    return this._filter;
  }

  // Convenience: build and execute the query immediately
  async execute() {
    return Expense.find(this.build());
  }
}

module.exports = ExpenseQueryBuilder;
