// ============================================================
// Design Pattern 1: Observer (Behavioral)
// ============================================================
// Problem: expenseController manually updates budget spentAmount
// in every create/update/delete operation — budget logic is scattered
// and tightly coupled to expense logic.
//
// Solution: ExpenseSubject emits events. BudgetObserver listens and
// reacts automatically. The controller only calls notify() — it never
// touches Budget directly. Adding more observers (e.g. email alerts)
// requires zero changes to the controller.
// ============================================================

const Budget = require('../../models/Budget');

class Observer {
  async update(eventType, data) {
    throw new Error('update() must be implemented by subclass');
  }
}

class BudgetObserver extends Observer {
  async update(eventType, data) {
    const { userId, category, amount, oldCategory, oldAmount } = data;

    if (eventType === 'expense:created') {
      const budget = await Budget.findOne({ userId, category });
      if (budget) {
        budget.spentAmount += Number(amount);
        await budget.save();
      }
    }

    if (eventType === 'expense:deleted') {
      const budget = await Budget.findOne({ userId, category });
      if (budget) {
        budget.spentAmount = Math.max(0, budget.spentAmount - Number(amount));
        await budget.save();
      }
    }

    if (eventType === 'expense:updated') {
      const old = await Budget.findOne({ userId, category: oldCategory });
      if (old) {
        old.spentAmount = Math.max(0, old.spentAmount - Number(oldAmount));
        await old.save();
      }
      const updated = await Budget.findOne({ userId, category });
      if (updated) {
        updated.spentAmount += Number(amount);
        await updated.save();
      }
    }
  }
}

class ExpenseSubject {
  constructor() {
    this._observers = [];
  }

  subscribe(observer) {
    this._observers.push(observer);
  }

  async notify(eventType, data) {
    for (const observer of this._observers) {
      await observer.update(eventType, data);
    }
  }
}

// Pre-wired singleton — import this in expenseController
const expenseSubject = new ExpenseSubject();
expenseSubject.subscribe(new BudgetObserver());

module.exports = { expenseSubject, ExpenseSubject, BudgetObserver };
