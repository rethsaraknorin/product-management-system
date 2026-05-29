export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center px-6 py-4 bg-white border-b">
        <h1 className="text-xl font-semibold text-dark">{title}</h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <p className="text-sm text-neutral">Coming soon</p>
      </div>
    </div>
  );
}
