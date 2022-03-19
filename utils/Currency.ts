/**
 * Transforms number to specific currency
 * @param {Number} number
 * @returns {Number}
 */
export const toCurrency = (number: number): string => {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    //maximumSignificantDigits: 1
    minimumFractionDigits: 0,
  }).format(number);
};
