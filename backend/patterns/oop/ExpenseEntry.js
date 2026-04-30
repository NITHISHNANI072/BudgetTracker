// OOP Principle: Inheritance
// ExpenseEntry inherits from BudgetEntry and adds expense-specific fields
// (category, isRecurring). Demonstrates reuse without code duplication.

const BudgetEntry = require('./BudgetEntry');

class ExpenseEntry extends BudgetEntry {
  constructor(data) {
    super(data);                          // inherits _userId, _amount, _date, _description
    this._category = data.category;       // expense-specific field
    this._isRecurring = data.isRecurring || false;
  }

  get category() { return this._category; }
  get isRecurring() { return this._isRecurring; }

  // OOP Principle: Polymorphism — overrides base summarize() with expense-specific version
  summarize() {
    const tag = this._isRecurring ? '[Recurring]' : '';
    return `Expense: $${this._amount} for "${this._category}" on ${this._date} ${tag}`.trim();
  }

  // Expense-specific method
  exceedsBudget(budgetLimit) {
    return this._amount > budgetLimit;
  }
}

module.exports = ExpenseEntry;
