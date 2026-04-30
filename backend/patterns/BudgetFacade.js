// Design Pattern 3: Facade
// Provides a single simplified interface to the complex subsystem of
// Expense, Income, and Budget models. Route handlers call one Facade
// method instead of coordinating 3 different models themselves.

const Expense = require('../models/Expense');
const Income = require('../models/Income');
const Budget = require('../models/Budget');

class BudgetFacade {
  // Creates an expense AND automatically updates the matching budget's spentAmount.
  // Without Facade, this two-step logic would be duplicated in every controller.
  async addExpense(userId, data) {
    const expense = await Expense.create({ userId, ...data });

    const budget = await Budget.findOne({ userId, category: data.category });
    if (budget) {
      budget.spentAmount += Number(data.amount);
      await budget.save();
    }

    return expense;
  }

  // Deletes an expense AND rolls back the linked budget's spentAmount.
  async removeExpense(userId, expenseId) {
    const expense = await Expense.findById(expenseId);
    if (!expense) throw new Error('Expense not found');
    if (expense.userId.toString() !== userId) throw new Error('Not authorized');

    const budget = await Budget.findOne({ userId, category: expense.category });
    if (budget) {
      budget.spentAmount = Math.max(0, budget.spentAmount - Number(expense.amount));
      await budget.save();
    }

    await expense.deleteOne();
    return { message: 'Expense deleted' };
  }

  // Returns a combined financial summary for the dashboard in one call.
  async getSummary(userId) {
    const [expenses, incomes, budgets] = await Promise.all([
      Expense.find({ userId }),
      Income.find({ userId }),
      Budget.find({ userId }),
    ]);

    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalBudget = budgets.reduce((sum, b) => sum + b.limitAmount, 0);
    const netBalance = totalIncome - totalExpenses;

    return { totalExpenses, totalIncome, totalBudget, netBalance };
  }
}

module.exports = new BudgetFacade();
