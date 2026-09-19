export default function Footer() {
  return (
    <footer className="w-full max-w-4xl mx-auto py-space-lg flex flex-col gap-space-md text-secondary text-body-sm">
      {/* Disclaimer block */}
      <div className="w-full rounded-xl bg-surface-container-low/70 border border-outline-variant/40 px-4 py-3.5 flex flex-col sm:flex-row items-start gap-3">
        <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
          info
        </span>
        <p className="text-body-sm leading-relaxed text-on-surface-variant">
          <span className="font-semibold text-on-surface">
            Disclaimer:
          </span>{' '}
          This is an independent, privately developed utility and is{' '}
          <span className="font-semibold text-on-surface">
            not affiliated with, endorsed by, or operated by
          </span>{' '}
          the Government of India, the National Payments Corporation of India
          (NPCI), the Reserve Bank of India (RBI), or any bank, UPI app, or
          payment service provider. “UPI”, “NPCI”, and related marks are the
          property of their respective owners. QR codes generated here encode
          standard UPI deep links and are processed by your own payment
          provider. Always verify payee details before accepting any payment.
        </p>
      </div>

      {/* Bottom row — brand strip + made-with */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 font-medium">
          <span>Made with</span>
          <span
            className="material-symbols-outlined text-[16px] text-error"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            favorite
          </span>
          <span>for Indian Merchants</span>
        </div>

        <div className="flex items-center gap-2 font-label-md text-label-md text-secondary">
          <span className="font-semibold text-on-surface">UPI</span>
          <span className="text-outline">•</span>
          <span className="font-semibold text-primary">No MDR</span>
          <span className="text-outline">•</span>
          <span className="font-semibold text-on-surface">More Business</span>
        </div>
      </div>
    </footer>
  );
}