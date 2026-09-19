export default function ToastStack({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-lg shadow-xl text-body-sm flex items-center gap-2 animate-bounce"
        >
          <span className="material-symbols-outlined text-[18px] text-primary-fixed">
            {toast.icon}
          </span>
          {toast.message}
        </div>
      ))}
    </div>
  );
}