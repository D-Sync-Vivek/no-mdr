const CHIPS = [
  { icon: 'percent', label: 'Zero MDR on UPI' },
  { icon: 'flash_on', label: 'Instant Autocalc' },
  { icon: 'sentiment_satisfied', label: 'Customer Friendly' },
  { icon: 'storefront', label: 'Indian Retail Ready' },
];

export default function Hero() {
  return (
    <header className="w-full flex flex-col items-center text-center relative py-space-md">
      {/* Merchant Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-primary text-label-sm font-label-sm tracking-wide uppercase mb-space-sm">
        <span
          className="material-symbols-outlined text-[15px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          verified
        </span>
        <span>Built for Merchants</span>
      </div>

      {/* Headline */}
      <h1 className="font-headline-xl text-headline-xl text-on-background tracking-tight max-w-2xl mt-1">
        Receive Payments <br className="hidden sm:inline" />
        Without{' '}
        <span className="text-primary font-headline-xl underline decoration-primary-fixed decoration-4 underline-offset-4">
          MDR Hassles
        </span>
      </h1>

      {/* Supporting Tagline */}
      <p className="font-body-lg text-body-lg text-secondary max-w-xl mt-space-sm mb-space-lg leading-relaxed">
        Split large transactions into multiple zero-surcharge UPI QR codes (≤ ₹1,999) and
        eliminate transaction fee friction at checkout.
      </p>

      {/* Annotations and Horizontal Value Badges */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-space-md items-center mt-space-xs relative">
        {/* Left Editorial Annotation Note */}
        <div className="hidden lg:flex md:col-span-3 flex-col items-end pr-space-md space-y-1 relative">
          <div className="flex items-center gap-2 bg-surface-container-lowest p-2.5 rounded-xl shadow-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
            <div className="text-left font-headline-sm text-[13px] leading-tight text-on-surface">
              <span className="font-semibold text-primary block">Same UPI.</span>
              <span className="text-secondary font-medium">Smarter split payout.</span>
            </div>
          </div>
          <svg
            className="w-24 h-12 text-primary -mr-2 mt-1 opacity-80"
            fill="none"
            viewBox="0 0 100 45"
          >
            <path
              d="M12,4 C38,2 78,16 88,38"
              stroke="currentColor"
              strokeDasharray="3 3"
              strokeLinecap="round"
              strokeWidth="1.75"
            />
            <polygon fill="currentColor" points="84,40 92,39 88,32" />
          </svg>
        </div>

        {/* 4 Compact Benefit Micro-Chips */}
        <div className="md:col-span-12 lg:col-span-9 flex flex-wrap items-center justify-center lg:justify-start gap-2">
          {CHIPS.map((chip) => (
            <div
              key={chip.label}
              className="flex items-center gap-2 bg-surface-container-lowest px-3 py-1.5 rounded-full shadow-sm text-secondary text-label-md font-label-md"
            >
              <span className="material-symbols-outlined text-primary text-[18px]">
                {chip.icon}
              </span>
              <span className="text-on-surface font-semibold">{chip.label}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}