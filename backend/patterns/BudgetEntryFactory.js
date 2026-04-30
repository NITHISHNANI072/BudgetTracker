// Design Pattern 2: Factory
// Centralises the creation of budget entry objects (income or expense).
// Without this, every place in the codebase that creates entries would need
// its own if/else logic — the Factory puts that logic in one place.

class IncomeEntry {
  constructor(data) {
    this.type = 'income';
    this.userId = data.userId;
    this.amount = data.amount;
    this.source = data.source;
    this.date = data.date;
    this.description = data.description || '';
  }

  summarize() {
    return `Income of $${this.amount} from ${this.source} on ${this.date}`;
  }

  validate() {
    if (!this.amount || !this.source || !this.date) {
      throw new Error('Income requires amount, source, and date');
    }
  }
}

class ExpenseEntry {
  constructor(data) {
    this.type = 'expense';
    this.userId = data.userId;
    this.amount = data.amount;
    this.category = data.category;
    this.date = data.date;
    this.description = data.description || '';
  }

  summarize() {
    return `Expense of $${this.amount} for ${this.category} on ${this.date}`;
  }

  validate() {
    if (!this.amount || !this.category || !this.date) {
      throw new Error('Expense requires amount, category, and date');
    }
  }
}

class BudgetEntryFactory {
  static create(type, data) {
    if (type === 'income') return new IncomeEntry(data);
    if (type === 'expense') return new ExpenseEntry(data);
    throw new Error(`Unknown entry type: ${type}. Must be 'income' or 'expense'.`);
  }
}

module.exports = { BudgetEntryFactory, IncomeEntry, ExpenseEntry };
