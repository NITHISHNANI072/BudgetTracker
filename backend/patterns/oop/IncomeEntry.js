// ============================================================
// OOP Principles — IncomeEntry subclass
// ============================================================
// Inheritance: inherits _userId, _amount, _date, _description,
//   setStatus(), and toJSON() from BudgetEntry. Only adds
//   income-specific fields (_source, _taxRate).
//
// Polymorphism: overrides summarize() with income-specific output.
//   When toJSON() calls this.summarize(), it gets the IncomeEntry
//   version even though toJSON() is defined in the base class.
// ============================================================

const BudgetEntry = require('./BudgetEntry');

class IncomeEntry extends BudgetEntry {
  constructor(data) {
    super(data);
    this._source  = data.source;
    this._taxRate = data.taxRate || 0;
  }

  get source() { return this._source; }

  // Polymorphism: income-specific implementation of summarize()
  summarize() {
    return `Income: $${this._amount} from "${this._source}" on ${this._date}`;
  }

  // Income-only method — not on base class (Inheritance / extension)
  calculateNetIncome() {
    return parseFloat((this._amount * (1 - this._taxRate)).toFixed(2));
  }
}

module.exports = IncomeEntry;
