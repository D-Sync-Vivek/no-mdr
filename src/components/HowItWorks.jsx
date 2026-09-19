const STEPS = [
  {
    n: '01',
    title: 'Enter Details',
    body: 'Add your order amount, registered UPI ID, shop name, and capped limit (≤ ₹1,999).',
  },
  {
    n: '02',
    title: 'Split Math',
    body: 'The algorithm partitions totals automatically into the minimal permissible MDR-free QR set.',
  },
  {
    n: '03',
    title: 'Display or Print',
    body: 'Present dynamically on screen or print 3-part receipt slips for counter payment.',
  },
  {
    n: '04',
    title: 'Instant Settle',
    body: 'Funds route immediately to your bank account with zero merchant discount rates deducted.',
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full max-w-4xl mx-auto py-space-sm mb-space-xl">
      <div className="text-center mb-space-lg">
        <span className="text-primary text-label-sm font-semibold uppercase tracking-wider">
          Operational Workflow
        </span>
        <h3 className="font-headline-lg text-headline-md sm:text-headline-lg font-bold text-on-surface mt-1">
          How It Works
        </h3>
        <p className="text-secondary text-body-md max-w-md mx-auto mt-1">
          Four immediate steps to bypass interchange fees and simplify customer checkout.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-space-md">
        {STEPS.map((step) => (
          <div
            key={step.n}
            className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex flex-col items-start relative group hover:shadow-md transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-primary text-on-primary font-headline-sm text-[14px] flex items-center justify-center font-bold mb-3.5 shadow-sm">
              {step.n}
            </div>
            <h4 className="font-headline-sm text-headline-sm font-semibold text-on-surface mb-1">
              {step.title}
            </h4>
            <p className="text-secondary text-body-sm font-body-sm leading-relaxed">
              {step.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}