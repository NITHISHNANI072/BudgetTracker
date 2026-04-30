// ============================================================
// OOP Principles — Base Class
// ============================================================
// Abstraction: BudgetEntry defines the common interface for all
//   financial entries. Callers use summarize() and toJSON() without
//   knowing whether the entry is income or expense.
//
// Encapsulation: Fields are private (_amount, _userId etc.) and
//   only accessible through controlled getters. Direct field mutation
//   is prevented — setStatus() validates before changing state.
// ============================================================

class BudgetEntry {
  constructor(data) {
    if (new.target === BudgetEntry) {
      throw new Error('BudgetEntry is abstract — use IncomeEntry or ExpenseEntry');
    }
    this._id          = data.id || null;
    this._userId      = data.userId;
    this._amount      = data.amount;
    this._date        = data.date;
    this._description = data.description || '';
    this._status      = 'active';
  }

  // Encapsulation: read-only public accessors
  get amount()      { return this._amount; }
  get userId()      { return this._userId; }
  get date()        { return this._date; }
  get description() { return this._description; }
  get status()      { return this._status; }

  // Encapsulation: validated setter — status cannot be set to arbitrary values
  setStatus(status) {
    const allowed = ['active', 'archived'];
    if (!allowed.includes(status)) throw new Error(`Invalid status: ${status}`);
    this._status = status;
  }

  // Abstraction: subclasses must provide their own summarize()
  summarize() {
    throw new Error('summarize() must be implemented by subclass');
  }

  // Shared method (Inheritance) — calls subclass summarize() via Polymorphism
  toJSON() {
    return {
      userId:      this._userId,
      amount:      this._amount,
      date:        this._date,
      description: this._description,
      status:      this._status,
      summary:     this.summarize(),
    };
  }
}

module.exports = BudgetEntry;
