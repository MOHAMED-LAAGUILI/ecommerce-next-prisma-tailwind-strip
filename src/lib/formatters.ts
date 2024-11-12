// Currency formatter for USD with no decimals
const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0, // Ensures no decimal places are shown
  });
  
  export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount); // Format the amount as USD currency
  }
  
  // General number formatter (no specific style)
  const NUMBER_FORMATTER = new Intl.NumberFormat('en-US');
  
  export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number); // Format the number with commas as needed
  }
  