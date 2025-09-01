// Utility function to get the symbol for temperature units
// It returns "°F" for imperial units and "°C" for metric units
export const symbolFor = (units) => (units === "imperial" ? "°F" : "°C");
