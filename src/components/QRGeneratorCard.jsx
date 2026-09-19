export default function QRGeneratorCard({
  totalAmount,
  setTotalAmount,
  upiId,
  setUpiId,
  payeeName,
  setPayeeName,
  onSubmit,
}) {
  return (
    <section className="w-full relative mt-space-sm mb-space-xl">
      {/* Annotation Right side for Max Amount (Desktop) */}
      <div className="hidden xl:flex flex-col items-start absolute -right-24 top-24 z-20 pointer-events-none">
      <svg className="w-20 h-16 text-primary mb-1 -ml-10" fill="none" viewBox="0 0 90 60">
        <path
          d="M75,50 C65,20 35,8 8,12"
          stroke="currentColor"
          strokeDasharray="3 2"
          strokeLinecap="round"
          strokeWidth="1.75"
        />
        <polygon
          fill="currentColor"
          points="8,12 15,5 14,16"
        />
      </svg>
        <div className="bg-surface-container-low px-3 py-1.5 rounded-lg shadow-sm text-primary font-headline-sm text-label-md leading-tight">
          <span className="font-bold block">Cap: ₹1,999</span>
          <span className="text-on-surface-variant text-body-sm font-normal">
            Exempt bracket
          </span>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        {/* Accent Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-primary-fixed-dim to-primary" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-space-lg">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[26px]">
                qr_code_scanner
              </span>
              <h2 className="font-headline-lg text-headline-md sm:text-headline-lg text-on-surface font-bold tracking-tight">
                Generate QR Codes
              </h2>
            </div>
            <p className="font-body-md text-body-md text-secondary mt-0.5">
             Split any order total into zero-MDR UPI QR codes, each under ₹1,999.
            </p>
          </div>

          <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-low rounded-md text-primary font-label-md text-label-md">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
            Active Surcharge Engine
          </div>
        </div>

        <form className="space-y-space-md" onSubmit={onSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-space-md gap-y-space-lg items-start">

            {/* Field 1: Total Amount */}
            <div className="flex flex-col">
              <label
                htmlFor="totalAmount"
                className="mb-1.5 h-5 flex items-center justify-between font-label-md text-label-md font-semibold text-on-surface-variant"
              >
                <span>Total Amount</span>
                <span className="text-body-sm font-normal text-secondary">Subtotal</span>
              </label>
              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-3.5 select-none font-headline-sm text-[16px] text-secondary">
                  ₹
                </span>
                <input
                  id="totalAmount"
                  type="number"
                  min="1"
                  max="500000"
                  required
                  value={totalAmount}
                  onChange={(e) => setTotalAmount(e.target.value)}
                  placeholder="Enter total amount"
                  className="h-11 w-full rounded-lg bg-surface-container-lowest pl-8 pr-3.5 font-headline-sm text-[15px] text-on-surface shadow-sm placeholder:text-outline-variant transition-shadow focus:bg-surface-container-low/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Field 2: Merchant UPI VPA */}
            <div className="flex flex-col">
              <label
                htmlFor="upiId"
                className="mb-1.5 h-5 flex items-center justify-between font-label-md text-label-md font-semibold text-on-surface-variant"
              >
                <span>Merchant UPI VPA</span>
                <span className="flex items-center gap-1 text-body-sm font-medium text-primary">
                  <span className="material-symbols-outlined text-[14px]">
                    verified_user
                  </span>
                  Verified
                </span>
              </label>
              <div className="relative flex items-center">
                <input
                  id="upiId"
                  type="text"
                  required
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="your@upi"
                  className="h-11 w-full rounded-lg bg-surface-container-lowest pl-9 pr-3.5 font-body-md text-body-md text-on-surface shadow-sm placeholder:text-outline-variant transition-shadow focus:bg-surface-container-low/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Field 3: Payee Name */}
            <div className="flex flex-col">
              <label
                htmlFor="payeeName"
                className="mb-1.5 h-5 flex items-center justify-between font-label-md text-label-md font-semibold text-on-surface-variant"
              >
                <span>Store / Payee Legal Name</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined pointer-events-none absolute left-3 text-[18px] text-secondary">
                  store
                </span>
                <input
                  id="payeeName"
                  type="text"
                  value={payeeName}
                  onChange={(e) => setPayeeName(e.target.value)}
                  placeholder="e.g. Your Shop Name"
                  className="h-11 w-full rounded-lg bg-surface-container-lowest pl-9 pr-3.5 font-body-md text-body-md text-on-surface shadow-sm placeholder:text-outline-variant transition-shadow focus:bg-surface-container-low/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Field 4: Max Amount Per QR */}
            <div className="flex flex-col">
              <label
                htmlFor="maxAmount"
                className="mb-1.5 h-5 flex items-center justify-between font-label-md text-label-md font-semibold text-on-surface-variant"
              >
                <span>Max Ceiling per QR</span>
                <span className="rounded bg-primary/10 px-1.5 py-0.5 text-label-sm font-bold text-primary">
                  MDR Free Zone
                </span>
              </label>
              <div className="relative flex items-center">
                <span className="pointer-events-none absolute left-3.5 font-headline-sm text-[16px] text-secondary">
                  ₹
                </span>
                <input
                  id="maxAmount"
                  type="text"
                  readOnly
                  value="1,999"
                  className="h-11 w-full cursor-not-allowed rounded-lg bg-surface-container-low pl-8 pr-28 font-headline-sm text-[15px] text-on-surface shadow-inner"
                />
                <div className="absolute right-2.5 flex items-center gap-1 rounded bg-surface-container-lowest px-2 py-1 text-label-sm font-semibold text-primary">
                  <span className="material-symbols-outlined text-[15px]">lock</span>
                  <span>≤ ₹1,999</span>
                </div>
              </div>
              <span className="mt-1.5 text-body-sm leading-tight text-secondary">
                Capped at ₹1,999 to guarantee zero MDR.
              </span>
            </div>

          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary font-headline-sm text-headline-sm font-semibold text-on-primary shadow-md transition-transform hover:bg-primary-container active:scale-[0.99]"
            >
              <span className="material-symbols-outlined text-[22px]">qr_code_2</span>
              <span>Generate Split QR Codes</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}