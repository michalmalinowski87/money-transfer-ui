import { getCurrencySymbol } from "./constants";

// Get currency display with symbol
export const getFormattedAmount = ({ amount, currency }) => {
    const symbol = getCurrencySymbol(currency);
    return symbol + amount;
};