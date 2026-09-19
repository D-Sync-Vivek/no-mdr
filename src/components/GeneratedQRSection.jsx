import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { formatINR, MAX_PER_QR } from '../lib/utils';
import { buildUpiUri } from '../lib/upi';

export default function GeneratedQRSection({
  total,
  slices,
  payeeName,
  upiId,
  onPaid,
}) {
  const handle = upiId.split('@')[1] || 'upi';
  const [qrMap, setQrMap] = useState([]);
  const [paidSet, setPaidSet] = useState(() => new Set());

  // Reset "paid" flags whenever a new split set is generated.
  useEffect(() => {
    setPaidSet(new Set());
  }, [slices, upiId, payeeName]);

  // Build one UPI URI + one PNG data URL per slice.
  useEffect(() => {
    let cancelled = false;

    const build = async () => {
      const entries = await Promise.all(
        slices.map(async (amount, idx) => {
          const note =
            slices.length > 1
              ? `Payment ${idx + 1} of ${slices.length}`
              : 'Payment';

          const uri = buildUpiUri({
            vpa: upiId,
            name: payeeName,
            amount,
            note,
          });

          const dataUrl = await QRCode.toDataURL(uri, {
            errorCorrectionLevel: 'M',
            margin: 2,
            width: 512,
            color: { dark: '#061d2f', light: '#ffffff' },
          });

          return { uri, dataUrl };
        })
      );

      if (!cancelled) setQrMap(entries);
    };

    build();
    return () => {
      cancelled = true;
    };
  }, [slices, upiId, payeeName]);

  const togglePaid = (idx) => {
    const willBePaid = !paidSet.has(idx);

    setPaidSet((prev) => {
      const next = new Set(prev);
      if (willBePaid) {
        next.add(idx);
      } else {
        next.delete(idx);
      }
      return next;
    });

    if (willBePaid) {
      onPaid?.(idx + 1);
    }
  };

  const paidCount = paidSet.size;
  const allPaid = paidCount === slices.length && slices.length > 0;

  return (
    <section className="w-full max-w-5xl mx-auto rounded-2xl bg-surface-container-low p-5 sm:p-7 shadow-sm mb-space-xl">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-space-md">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px]">
            dataset
          </span>
          <div>
            <h3 className="font-headline-lg text-headline-md font-bold text-on-surface">
              Split Payment Breakdown
            </h3>
            <p className="text-body-sm font-body-sm text-secondary">
              Present QR codes sequentially and mark each as paid once
              settlement is received.
            </p>
          </div>
        </div>

        <div className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-label-md text-label-md flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full ${
              allPaid ? 'bg-primary' : 'bg-primary/60 animate-pulse'
            }`}
          />
          <span className="font-semibold text-primary">
            Total: <span>{formatINR(total)}</span>
          </span>
          <span className="text-outline">|</span>
          <span className="text-secondary font-medium">
            {paidCount} of {slices.length} Paid
          </span>
        </div>
      </div>

      {/* QR Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {slices.map((sliceAmt, idx) => {
          const isLast = idx === slices.length - 1;
          const isMax = sliceAmt === MAX_PER_QR;
          const isPaid = paidSet.has(idx);
          const tagText =
            isLast && slices.length > 1
              ? `QR ${idx + 1} of ${slices.length} Balance`
              : `QR ${idx + 1} of ${slices.length}`;

          return (
            <div
              key={idx}
              className={`rounded-xl p-4 sm:p-5 flex flex-col items-center shadow-sm relative group transition-all duration-300 ${
                isPaid
                  ? 'bg-surface-container-low/70'
                  : 'bg-surface-container-lowest hover:shadow-md'
              }`}
            >
              <div className="w-full flex items-center justify-between mb-3">
                <span
                  className={`px-2.5 py-0.5 rounded-md text-label-sm font-semibold uppercase transition-colors ${
                    isPaid
                      ? 'bg-primary/10 text-primary'
                      : 'bg-surface-container-low text-primary'
                  }`}
                >
                  {tagText}
                </span>
                <span
                  className={`inline-flex items-center text-label-sm gap-0.5 ${
                    isPaid ? 'text-primary' : 'text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {isPaid ? 'task_alt' : 'verified'}
                  </span>
                  {isPaid ? 'Settled' : 'Ready to Scan'}
                </span>
              </div>

              {/* QR code + paid overlay */}
              <div className="w-44 h-44 relative rounded-lg shadow-inner flex items-center justify-center mb-3 overflow-hidden bg-surface-container-lowest">
                <div
                  className={`w-full h-full p-2 transition-all duration-300 ${
                    isPaid ? 'opacity-25 blur-[1px]' : 'opacity-100'
                  }`}
                >
                  <QrCodeFromDataUrl dataUrl={qrMap[idx]?.dataUrl} />
                </div>

                {/* Green tick overlay */}
                {isPaid && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 rounded-full bg-primary/95 shadow-lg flex items-center justify-center animate-[popIn_240ms_ease-out]">
                      <span
                        className="material-symbols-outlined text-white text-[44px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-center w-full">
                <span className="text-label-sm font-label-sm uppercase tracking-wider text-secondary">
                  Pay Amount
                </span>
                <div
                  className={`font-currency-display text-currency-display font-bold tracking-tight transition-all ${
                    isPaid
                      ? 'text-primary/60 line-through decoration-primary/40 decoration-2'
                      : isMax
                      ? 'text-primary'
                      : 'text-on-surface'
                  }`}
                >
                  {formatINR(sliceAmt)}
                </div>
                <p className="text-body-sm font-body-sm text-secondary truncate px-2 mt-0.5">
                  {payeeName} • {handle}
                </p>
              </div>

              {/* Paid toggle button */}
              <div className="w-full mt-4">
                <button
                  type="button"
                  onClick={() => togglePaid(idx)}
                  className={`w-full h-10 rounded-lg font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isPaid
                      ? 'bg-primary text-on-primary hover:bg-primary-container shadow-sm'
                      : 'bg-surface-container-low hover:bg-surface-container text-primary'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isPaid ? 'undo' : 'check_circle'}
                  </span>
                  <span>{isPaid ? 'Mark Unpaid' : 'Mark as Paid'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Utility Strip */}
      <div className="mt-space-md pt-3 flex flex-wrap items-center justify-between gap-3 text-secondary text-body-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[16px] text-primary">
            info
          </span>
          <span>
            {allPaid
              ? 'All split payments have been marked as settled. Ready for reconciliation.'
              : 'Tap "Mark as Paid" after each scan to track settlement progress.'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="text-primary font-semibold hover:underline flex items-center gap-1 text-label-md"
          >
            <span className="material-symbols-outlined text-[15px]">print</span>
            Print QR Slip
          </button>
        </div>
      </div>
    </section>
  );
}

function QrCodeFromDataUrl({ dataUrl }) {
  if (!dataUrl) {
    return (
      <div className="w-full h-full bg-surface-container-low animate-pulse rounded" />
    );
  }
  return (
    <img
      src={dataUrl}
      alt="UPI payment QR code"
      className="w-full h-full object-contain"
      draggable={false}
    />
  );
}