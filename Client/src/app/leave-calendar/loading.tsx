export default function CalendarLoading() {
  return (
    <div className="w-full min-h-screen">
      {/* Desktop skeleton */}
      <div className="hidden md:block">
        <div className="w-[280px] h-screen fixed left-0 top-0 bg-surface border-r border-outline-variant animate-pulse" />
        <div className="fixed top-0 right-0 left-[280px] h-16 bg-surface border-b border-outline-variant" />
        <main className="ml-[280px] mt-16 p-8 min-h-screen space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-8 w-24 rounded-full bg-surface-container animate-pulse" />
              ))}
            </div>
            <div className="h-10 w-36 rounded-xl bg-surface-container animate-pulse" />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-8 h-[540px] rounded-xl bg-surface-container animate-pulse" />
            <div className="col-span-4 space-y-4">
              <div className="h-40 rounded-xl bg-surface-container animate-pulse" />
              <div className="h-28 rounded-xl bg-surface-container animate-pulse" />
              <div className="h-32 rounded-xl bg-surface-container animate-pulse" />
              <div className="h-48 rounded-xl bg-surface-container animate-pulse" />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile skeleton */}
      <div className="block md:hidden">
        <div className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-outline-variant" />
        <main className="pt-20 px-4 pb-24 space-y-4">
          <div className="h-12 w-full rounded-2xl bg-surface-container animate-pulse" />
          <div className="h-96 w-full rounded-xl bg-surface-container animate-pulse" />
          <div className="flex gap-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-8 w-16 rounded-full bg-surface-container animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 rounded-xl bg-surface-container animate-pulse" />
            <div className="h-24 rounded-xl bg-surface-container animate-pulse" />
          </div>
        </main>
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-surface border-t border-outline-variant" />
      </div>
    </div>
  );
}
