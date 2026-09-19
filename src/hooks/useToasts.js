import { useCallback, useRef, useState } from 'react';

export function useToasts(duration = 2500) {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const push = useCallback(
    (message, icon = 'check_circle') => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, icon }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    [duration]
  );

  return { toasts, push };
}