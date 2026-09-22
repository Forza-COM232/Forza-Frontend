export const formatNumber = (n: number) => n.toLocaleString("en-PH");

export const formatPeso = (n: number) => `₱ ${formatNumber(n)}`;

export const formatPercent = (n: number, digits = 1) => `${Math.abs(n).toFixed(digits)}%`;

/** Signed percent for display, e.g. 84 → "84%", -30 → "-30%" */
export const formatSignedPercent = (n: number) => `${n}%`;
