export default function DashboardLoading() {
  return (
    <div className="w-full min-h-screen">
      {/* Desktop skeleton */}
      <div className="hidden md:block">
        {/* Sidebar placeholder */}
        <div className="w-[280px] h-screen fixed left-0 top-0 bg-surface border-r border-outline-variant animate-pulse" />
        {/* TopBar placeholder */}
        <div className="fixed top-0 right-0 left-[280px] h-16 bg-surface border-b border-outline-variant" />
        {/* Content */}
        <main className="ml-[280px] pt-24 px-lg min-h-screen space-y-lg">
          {/* Welcome banner */}
          <div className="h-28 w-full rounded-xl bg-surface-container animate-pulse" />
          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-md">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-28 rounded-xl bg-surface-container animate-pulse" />
            ))}
          </div>
          {/* Content blocks */}
          <div className="h-12 w-full rounded-xl bg-surface-container animate-pulse" />
          <div className="grid grid-cols-2 gap-md">
            <div className="h-64 rounded-xl bg-surface-container animate-pulse" />
            <div className="h-64 rounded-xl bg-surface-container animate-pulse" />
          </div>
        </main>
      </div>

      {/* Mobile skeleton */}
      <div className="block md:hidden">
        <div className="fixed top-0 left-0 right-0 h-16 bg-surface border-b border-outline-variant" />
        <main className="pt-20 px-sm pb-24 space-y-md">
          <div className="h-14 w-full rounded-xl bg-surface-container animate-pulse" />
          <div className="h-32 w-full rounded-xl bg-surface-container animate-pulse" />
          <div className="grid grid-cols-2 gap-sm">
            <div className="h-24 rounded-xl bg-surface-container animate-pulse" />
            <div className="h-24 rounded-xl bg-surface-container animate-pulse" />
          </div>
          <div className="h-24 w-full rounded-xl bg-surface-container animate-pulse" />
        </main>
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-surface border-t border-outline-variant" />
      </div>
    </div>
  );
}
