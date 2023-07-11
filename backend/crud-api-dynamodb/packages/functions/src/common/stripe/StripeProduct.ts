export const calculateStripePriceFromEUR = (amountEUR: number): string => {
    // Convert EUR to cents (Stripe uses cents as the base unit)
    const amountCents = Math.round(amountEUR * 100);

    // Format the price as a string with the correct number of decimal places (e.g., "10.99" for 10.99 EUR)
    // Create the Stripe price object
    return (amountCents / 100).toFixed(2)
};