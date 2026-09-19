import { useState } from 'react';
import Background from './components/Background';
import Hero from './components/Hero';
import QRGeneratorCard from './components/QRGeneratorCard';
import GeneratedQRSection from './components/GeneratedQRSection';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import ToastStack from './components/ToastStack';
import { useToasts } from './hooks/useToasts';
import { splitAmount } from './lib/utils';

export default function App() {
  const [totalAmount, setTotalAmount] = useState('');
  const [upiId, setUpiId] = useState('');
  const [payeeName, setPayeeName] = useState('');
  const [result, setResult] = useState(null); // null until first submit


  const { toasts, push } = useToasts();

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = parseFloat(totalAmount) || 0;
    if (total <= 0) return;
    setResult({ total, slices: splitAmount(total) });
  };

  const handlePaid = (idx) =>
  push(`QR ${idx} marked as paid.`, 'task_alt');


  return (
    <>
      <Background />

      <main className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center py-4 px-margin">
        <div className="w-full max-w-[1140px] mx-auto">
          <div className="flex flex-col w-full font-body-md text-on-surface items-center">
            <div className="w-full max-w-[1120px] flex flex-col items-center">
              <Hero />

              <QRGeneratorCard
                totalAmount={totalAmount}
                setTotalAmount={setTotalAmount}
                upiId={upiId}
                setUpiId={setUpiId}
                payeeName={payeeName}
                setPayeeName={setPayeeName}
                onSubmit={handleSubmit}
              />

              {result && (
                <GeneratedQRSection
                  total={result.total}
                  slices={result.slices}
                  payeeName={payeeName}
                  upiId={upiId}
                  onPaid={handlePaid}
                />
              )}

              <HowItWorks />

              <Footer />
            </div>
          </div>
        </div>
      </main>

      <ToastStack toasts={toasts} />
    </>
  );
}