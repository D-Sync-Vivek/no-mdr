const enc = encodeURIComponent;

/**
 * Build a UPI deep link that any UPI app can scan.
 * Spec: https://www.npci.org.in/what-we-do/upi/upi-linking-specifications
 */
export function buildUpiUri({ vpa, name, amount, note }) {
  return (
    `upi://pay?` +
    `pa=${enc(vpa)}` +
    `&pn=${enc(name)}` +
    `&am=${Number(amount).toFixed(2)}` +
    `&cu=INR` +
    `&tn=${enc(note || 'Payment')}`
  );
}