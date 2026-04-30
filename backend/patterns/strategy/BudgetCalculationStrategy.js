// ============================================================
// Design Pattern 3: Strategy (Behavioral)
// ============================================================
// Problem: Budgets support three time periods — Weekly, Monthly, Custom.
// Without Strategy, a single function would use if/else chains to handle
// each period type, becoming harder to extend as new periods are added.
//
// Solution: Each calculation algorithm is its own class implementing
// a common interface. BudgetCalculator accepts any strategy at runtime
// and delegates to it. Adding a new period (e.g. "Yearly") requires
// only a new class — no changes to existing code.
// ============================================================

// ---------- Strategy Interface ----------
class BudgetStrategy {
  // Returns the number of days in this budget period starting from startDate
  getPeriodDays(startDate) {
    throw new Error('getPeriodDays() must be implemented');
  }

  // Returns human-readable label for the period
  getLabel() {
    throw new Error('getLabel() must be implemented');
  }

  // Calculates the daily spending limit
  getDailyLimit(limitAmount, startDate) {
    const days = this.getPeriodDays(startDate);
    return parseFloat((limitAmount / days).toFixed(2));
  }
}

// ---------- Concrete Strategy: Weekly ----------
class WeeklyStrategy extends BudgetStrategy {
  getPeriodDays() {
    return 7;
  }

  getLabel() {
    return 'Weekly';
  }
}

// ---------- Concrete Strategy: Monthly ----------
class MonthlyStrategy extends BudgetStrategy {
  getPeriodDays(startDate) {
    const d = new Date(startDate);
    // Get actual days in the start month
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  }

  getLabel() {
    return 'Monthly';
  }
}

// ---------- Concrete Strategy: Custom (30-day window) ----------
class CustomStrategy extends BudgetStrategy {
  constructor(days = 30) {
    super();
    this._days = days;
  }

  getPeriodDays() {
    return this._days;
  }

  getLabel() {
    return `Custom (${this._days} days)`;
  }
}

// ---------- Context ----------
class BudgetCalculator {
  constructor(strategy) {
    this._strategy = strategy;
  }

  setStrategy(strategy) {
    this._strategy = strategy;
  }

  calculate(budget) {
    const dailyLimit = this._strategy.getDailyLimit(budget.limitAmount, budget.startDate);
    const remaining = budget.limitAmount - budget.spentAmount;
    const percentUsed = ((budget.spentAmount / budget.limitAmount) * 100).toFixed(1);

    return {
      category: budget.category,
      period: this._strategy.getLabel(),
      limitAmount: budget.limitAmount,
      spentAmount: budget.spentAmount,
      remaining,
      percentUsed: `${percentUsed}%`,
      dailyLimit,
      isOverBudget: budget.spentAmount > budget.limitAmount,
    };
  }
}

// Factory function: returns the right strategy based on timePeriod string
function getStrategy(timePeriod) {
  if (timePeriod === 'Weekly') return new WeeklyStrategy();
  if (timePeriod === 'Monthly') return new MonthlyStrategy();
  return new CustomStrategy();
}

module.exports = { BudgetCalculator, getStrategy, WeeklyStrategy, MonthlyStrategy, CustomStrategy };
