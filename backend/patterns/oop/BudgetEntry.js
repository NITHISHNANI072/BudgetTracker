// OOP Principle: Abstraction
// BudgetEntry is an abstract base class that defines the common structure and
// interface for all financial entries. Subclasses must implement summarize().
// Controllers interact with this interface without knowing the specific subtype.

class BudgetEntry {
  constructor(data) {
    if (new.target === BudgetEntry) {
      throw new Error('BudgetEntry is abstract and cannot be instantiated directly');
    }
    // OOP Principle: Encapsulation — private fields accessed only via methods
    this._id = data.id || null;
    this._userId = data.userId;
    this._amount = data.amount;
    this._date = data.date;
    this._description = data.description || '';
    this._status = 'active';
  }

  // Public getters — controlled access to private fields (Encapsulation)
  get amount() { return this._amount; }
  get userId() { return this._userId; }
  get date() { return this._date; }
  get description() { return this._description; }
  get status() { return this._status; }

  setStatus(status) {
    const valid = ['active', 'archived'];
    if (!valid.includes(status)) throw new Error(`Invalid status: ${status}`);
    this._status = status;
  }

  // Abstract method — subclasses must override (Abstraction)
  summarize() {
    throw new Error('summarize() must be implemented by subclass');
  }

  // Shared method available to all subclasses (Inheritance)
  toJSON() {
    return {
      userId: this._userId,
      amount: this._amount,
      date: this._date,
      description: this._description,
      status: this._status,
      summary: this.summarize(),  // Polymorphism — calls subclass version
    };
  }
}

module.exports = BudgetEntry;
