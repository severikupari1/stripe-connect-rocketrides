// Helper function: get the currency symbol for the given country ISO code
// @ts-ignore
export const getCurrencySymbol = currency => {
    const currencySymbol = new Intl.NumberFormat('en', {
        currency,
        style: 'currency'
    }).formatToParts(0).find(part => part.type === 'currency');
    return currencySymbol && currencySymbol.value;
};
