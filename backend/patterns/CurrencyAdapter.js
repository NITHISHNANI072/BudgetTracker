// Design Pattern 4: Adapter
// The LegacyCurrencyAPI uses a different interface (convertMoney, with
// 'from_currency'/'to_currency' keys) than what BudgetTracker expects
// (convert(amount, from, to)). The Adapter translates between the two so
// BudgetTracker never needs to know about the legacy API's structure.

// Simulates an external/legacy currency conversion API with its own interface
class LegacyCurrencyAPI {
  convertMoney(params) {
    // Simulated conversion rates (in a real app this would call an external API)
    const rates = { USD: 1, AUD: 1.53, EUR: 0.92, GBP: 0.79 };
    const from = rates[params.from_currency] || 1;
    const to = rates[params.to_currency] || 1;
    return { converted_amount: (params.value / from) * to };
  }
}

// Adapter: wraps LegacyCurrencyAPI with the interface BudgetTracker expects
class CurrencyAdapter {
  constructor() {
    this.legacyAPI = new LegacyCurrencyAPI();
  }

  // BudgetTracker calls this clean interface — no knowledge of the legacy API
  convert(amount, from, to) {
    const result = this.legacyAPI.convertMoney({
      value: amount,
      from_currency: from,
      to_currency: to,
    });
    return parseFloat(result.converted_amount.toFixed(2));
  }
}

module.exports = new CurrencyAdapter();
