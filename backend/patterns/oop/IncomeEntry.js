// OOP Principle: Inheritance
// IncomeEntry inherits all shared behaviour from BudgetEntry and only
// adds income-specific fields and logic (source, tax calculation).

const BudgetEntry = require('./BudgetEntry');

class IncomeEntry extends BudgetEntry {
  constructor(data) {
    super(data);                     // inherits _userId, _amount, _date, _description
    this._source = data.source;      // income-specific field
    this._taxRate = data.taxRate || 0;
  }

  get source() { return this._source; }

  // OOP Principle: Polymorphism — overrides base summarize() with income-specific version
  summarize() {
    return `Income: $${this._amount} from "${this._source}" on ${this._date}`;
  }

  // Income-specific method not on base class
  calculateNetIncome() {
    return this._amount * (1 - this._taxRate);
  }
}

module.exports = IncomeEntry;
