# No-MDR — Zero-Fee Split UPI QR Generator

A small, independent web tool for Indian merchants that splits a large order total into multiple **MDR-free UPI QR codes**, each capped at **₹1,999**. Built with React, Vite, and Tailwind CSS v4.

---

## What it does

- Enter a total order amount, merchant UPI VPA, and payee name.
- The tool splits the total into the **minimum number of QR codes** needed, each capped at ₹1,999 (the current MDR-free ceiling for UPI P2M transactions).
- Each QR encodes a **real, scannable UPI deep link** (`upi://pay?...`) — works with GPay, PhonePe, Paytm, BHIM, and any UPI-compliant app.
- Mark each QR as **Paid** as settlement comes in; the card dims and a green tick overlays the QR so you can visually track progress.
- Print the QR slip or present the codes on screen at the counter.

---

## Why

UPI P2M transactions up to ₹1,999 are exempt from Merchant Discount Rate (MDR). Splitting larger invoices into sub-₹1,999 QR codes lets small merchants avoid interchange fees on card/UPI payments without extra hardware or a payment gateway.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first `@theme` config) |
| QR encoding | [`qrcode`](https://www.npmjs.com/package/qrcode) |
| Fonts | Inter (body) · Geist + Geist Mono (headings & currency) |
| Icons | Material Symbols Outlined (Google Fonts) |

---

## Getting started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

Open the dev server URL (usually `http://localhost:5173`) in your browser.

---

## Project structure

```
no-mdr/
├── index.html                       # Font + icon links, #root mount
├── vite.config.js                   # Vite + React + Tailwind v4 plugin
├── package.json
└── src/
    ├── main.jsx                     # App entry
    ├── index.css                    # @import "tailwindcss" + @theme tokens
    ├── App.jsx                      # Top-level state, wiring
    ├── lib/
    │   ├── utils.js                 # formatINR, splitAmount
    │   └── upi.js                   # buildUpiUri (UPI deep-link builder)
    ├── hooks/
    │   └── useToasts.js             # Toast state
    └── components/
        ├── Background.jsx
        ├── Hero.jsx
        ├── QRGeneratorCard.jsx      # Input form
        ├── GeneratedQRSection.jsx   # QR grid + paid toggle
        ├── HowItWorks.jsx
        ├── Footer.jsx               # Includes non-affiliation disclaimer
        └── ToastStack.jsx
```

---

## How the split works

Given a total `T` and a cap `C = 1999`:

```
while T > 0:
  if T > C: push C, T -= C
  else:     push T, T = 0
```

So `₹5,000` → `[1999, 1999, 1002]` — three QRs, two at the cap and one balance. The last slice is never padded to the cap.

Each QR encodes a unique UPI note (`Payment 1 of 3`, etc.) so the payer's transaction history makes splits easy to reconcile.

---

## UPI deep link format

Every QR encodes:

```
upi://pay?pa=<vpa>&pn=<name>&am=<amount>&cu=INR&tn=<note>
```

| Param | Meaning |
|---|---|
| `pa` | Payee VPA (e.g. `merchant@okaxis`) |
| `pn` | Payee display name |
| `am` | Amount (2 decimals, fixed for split QR codes) |
| `cu` | Currency (always `INR`) |
| `tn` | Transaction note (used for the split label) |

Any UPI app will pre-fill the amount, payee, and note when scanning.

---

## Disclaimer

This is an **independent, privately developed utility** and is **not affiliated with, endorsed by, or operated by** the Government of India, the National Payments Corporation of India (NPCI), the Reserve Bank of India (RBI), or any bank, UPI app, or payment service provider.

"UPI", "NPCI", and related marks are the property of their respective owners. QR codes generated here encode standard UPI deep links and are processed by your own payment provider. **Always verify payee details before accepting any payment.**

---