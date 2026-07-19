export default function LoginSidePanel() {
  return (
    <div className="hidden xl:block fixed right-xl top-xl bottom-xl w-[400px] overflow-hidden rounded-3xl border border-outline-variant">
      <div className="absolute inset-0 bg-primary/5" />
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2fYWqi2SzTYJloSomwkmydvePrVt0sZnbSXm4_ivTWttUK89HlAeO4ZRQyqzu8zZKGsDfd-f1JrTdYOLWyunblelyZlN-wvwyAq22LNijF2gDPNgPuAjSGkscTEp6pstrNmMoM_fqlnAOYzVk-4VXfbBFudq7ucLlLDJ4rPBQgtmrJfvRSijLDqhFVVKsXe88c-BbfR_-df7KX-J4nSpe97iIeGNATUG-YlPu_Ip44jsBLp4Q65B5uw"
        alt="Modern university building facade at sunset"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-lg">
        <div>
          <p className="text-white font-headline-md text-headline-md mb-xs">Reduce Attendance Anxiety</p>
          <p className="text-white/80 font-body-md text-body-md">
            Empowering students with clear, actionable insights into their academic progress.
          </p>
        </div>
      </div>
    </div>
  );
}
