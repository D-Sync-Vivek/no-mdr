export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-primary-fixed/25 via-surface-container-low/40 to-transparent blur-3xl opacity-70" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-primary-fixed-dim/15 blur-[100px] rounded-full opacity-60" />
    </div>
  );
}