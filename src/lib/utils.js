export const MAX_PER_QR = 1999;

export function formatINR(val) {
  return '₹' + Number(val).toLocaleString('en-IN');
}

export function splitAmount(total, maxPerQr = MAX_PER_QR) {
  const slices = [];
  let remaining = Number(total);

  while (remaining > 0) {
    if (remaining > maxPerQr) {
      slices.push(maxPerQr);
      remaining -= maxPerQr;
    } else {
      slices.push(Math.round(remaining));
      remaining = 0;
    }
  }

  return slices;
}