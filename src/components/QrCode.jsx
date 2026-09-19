import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function QrCode({ value, className = '' }) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(value, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 512,
      color: { dark: '#061d2f', light: '#ffffff' },
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch((err) => console.error('QR generation failed:', err));

    return () => {
      cancelled = true;
    };
  }, [value]);

  if (!dataUrl) {
    return (
      <div
        className={`${className} bg-surface-container-low animate-pulse rounded`}
      />
    );
  }

  return (
    <img
      src={dataUrl}
      alt="UPI payment QR code"
      className={`${className} object-contain`}
      draggable={false}
    />
  );
}