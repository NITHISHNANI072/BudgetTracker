// Design Pattern 2: Repository — Income variant
// Same principle as ExpenseRepository: all Income database calls
// are centralised here. Controllers stay clean and database-agnostic.

const Income = require('../../models/Income');

class IncomeRepository {
  async findAllByUser(userId) {
    return Income.find({ userId });
  }

  async findById(id) {
    return Income.findById(id);
  }

  async create(data) {
    return Income.create(data);
  }

  async update(id, updates) {
    const income = await Income.findById(id);
    if (!income) return null;
    Object.assign(income, updates);
    return income.save();
  }

  async delete(id) {
    const income = await Income.findById(id);
    if (!income) return null;
    await income.deleteOne();
    return income;
  }

  async getTotalByUser(userId) {
    const incomes = await Income.find({ userId });
    return incomes.reduce((sum, i) => sum + i.amount, 0);
  }
}

module.exports = new IncomeRepository();
