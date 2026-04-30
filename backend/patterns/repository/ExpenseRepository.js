// ============================================================
// Design Pattern 2: Repository (Architectural)
// ============================================================
// Problem: Controllers call Mongoose directly — database logic is
// mixed with business logic. Swapping MongoDB for another database
// would require rewriting every controller.
//
// Solution: Repository wraps all database operations in one class.
// Controllers call repository methods — they have no knowledge of
// Mongoose or MongoDB. Only the repository changes if the database changes.
// ============================================================

const Expense = require('../../models/Expense');

class ExpenseRepository {
  async findAllByUser(userId) {
    return Expense.find({ userId });
  }

  async findById(id) {
    return Expense.findById(id);
  }

  async create(data) {
    return Expense.create(data);
  }

  async update(id, updates) {
    const expense = await Expense.findById(id);
    if (!expense) return null;
    Object.assign(expense, updates);
    return expense.save();
  }

  async delete(id) {
    const expense = await Expense.findById(id);
    if (!expense) return null;
    await expense.deleteOne();
    return expense;
  }

  async findByCategory(userId, category) {
    return Expense.find({ userId, category });
  }

  async getTotalByUser(userId) {
    const expenses = await Expense.find({ userId });
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }
}

module.exports = new ExpenseRepository();
