// ============================================================
// OOP Principles — ExpenseEntry subclass
// ============================================================
// Inheritance: inherits all BudgetEntry behaviour and adds
//   expense-specific fields (_category, _isRecurring).
//
// Polymorphism: summarize() returns an expense-specific string.
//   The base class toJSON() calls this.summarize() and gets the
//   correct output regardless of whether it holds an income or expense.
// ============================================================

const BudgetEntry = require('./BudgetEntry');

class ExpenseEntry extends BudgetEntry {
  constructor(data) {
    super(data);
    this._category    = data.category;
    this._isRecurring = data.isRecurring || false;
  }

  get category()    { return this._category; }
  get isRecurring() { return this._isRecurring; }

  // Polymorphism: expense-specific implementation of summarize()
  summarize() {
    const tag = this._isRecurring ? ' [Recurring]' : '';
    return `Expense: $${this._amount} for "${this._category}" on ${this._date}${tag}`;
  }

  // Expense-only method
  exceedsBudget(budgetLimit) {
    return this._amount > budgetLimit;
  }
}

module.exports = ExpenseEntry;
