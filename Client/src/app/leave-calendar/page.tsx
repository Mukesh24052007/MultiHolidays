
import React from 'react';

export default function CalendarPage() {
  return (
    <div className="w-full h-full min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        
        body {
            font-family: 'Hanken Grotesk', sans-serif;
            background-color: #f7f9fb;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
        }
        .scroll-hide::-webkit-scrollbar {
            display: none;
        }
        .scroll-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        /* Fade in animation for cards */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
        }
    

    body {
      min-height: max(884px, 100dvh);
    }
  
        
        body {
            font-family: 'Hanken Grotesk', sans-serif;
            background-color: #f7f9fb;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 12px;
        }
        .date-card {
            aspect-ratio: 1 / 1;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .date-card:hover {
            transform: translateY(-2px);
        }
    
      ` }} />
      <div className="block md:hidden">
        <div className="bg-background text-on-surface">
          <>


<header className="fixed top-0 right-0 left-0 h-16 bg-surface/80 backdrop-blur-md z-40 flex justify-between items-center px-sm md:hidden">
<h1 className="text-headline-md font-headline-md font-bold text-on-surface">MultiHolidays</h1>
<div className="flex items-center gap-2">
<button className="hover:bg-surface-container-low rounded-full p-2 transition-opacity active:opacity-80">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" data-alt="A professional close-up studio portrait of a young academic administrator with a warm, encouraging smile. The lighting is soft and natural, reflecting a modern corporate aesthetic with clean lines and a soft-focus office background. The colors are muted neutrals with subtle blue accents, consistent with a high-end educational portal environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwwHgDkQRyuvDQwxr7hfQTdodp_g4R3LZ0j4cl1WPgCux9Qa1xX_hMDR4g9N41MtSzu5nAj0uWgmFk-s1CQUVI9wnT_ygqWxPs05yXqLbGjghVbYAkyyXf0HSJg8RyS1EyhOyqBsTjXwQdtHafY_sAmJm1F-CRMyIofG5Q4bidYkPxsa7SDoDhngL9ShrkgJAOa7plx47sbsxVQONPGWrmNxckCT5IkdOSJZCw4CrbOix85HJ3HT2N2g" />
</div>
</div>
</header>

<aside className="hidden md:flex flex-col h-full py-md px-sm w-[280px] h-screen fixed left-0 top-0 bg-surface border-r border-outline-variant z-50">
<div className="mb-xl">
<h2 className="text-headline-md font-headline-md font-bold text-primary">MultiHolidays</h2>
<p className="text-label-sm font-label-sm text-on-surface-variant">Attendance Planning</p>
</div>
<nav className="flex-1 space-y-2">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-label-md font-label-md">Dashboard</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-secondary-container/30" href="#">
<span className="material-symbols-outlined">calendar_month</span>
<span className="text-label-md font-label-md">Leave Calendar</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined">person</span>
<span className="text-label-md font-label-md">Profile</span>
</a>
</nav>
<button className="mt-4 w-full py-3 bg-primary text-on-primary rounded-xl font-bold active:scale-95 duration-100 mb-lg">
            Apply for Leave
        </button>
<div className="mt-auto space-y-2 pt-md border-t border-outline-variant">
<a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-label-sm font-label-sm">Settings</span>
</a>
<a className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary" href="#">
<span className="material-symbols-outlined">help</span>
<span className="text-label-sm font-label-sm">Help</span>
</a>
</div>
</aside>

<main className="pt-20 pb-24 md:ml-[280px] px-sm md:px-lg min-h-screen">
<div className="max-w-[448px] mx-auto space-y-sm">

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md animate-fade-in">
<div className="flex justify-between items-center mb-md">
<h2 className="text-headline-md font-headline-md text-on-surface">May 2024</h2>
<div className="flex gap-1">
<button className="p-2 hover:bg-surface-container-low rounded-full"><span className="material-symbols-outlined text-on-surface-variant">chevron_left</span></button>
<button className="p-2 hover:bg-surface-container-low rounded-full"><span className="material-symbols-outlined text-on-surface-variant">chevron_right</span></button>
</div>
</div>
<div className="calendar-grid mb-xs">
<div className="text-center text-label-sm font-label-sm text-outline py-2">M</div>
<div className="text-center text-label-sm font-label-sm text-outline py-2">T</div>
<div className="text-center text-label-sm font-label-sm text-outline py-2">W</div>
<div className="text-center text-label-sm font-label-sm text-outline py-2">T</div>
<div className="text-center text-label-sm font-label-sm text-outline py-2">F</div>
<div className="text-center text-label-sm font-label-sm text-outline py-2">S</div>
<div className="text-center text-label-sm font-label-sm text-outline py-2">S</div>
</div>
<div className="calendar-grid gap-y-2">

<div className="text-center py-2 text-outline/30 text-label-md">29</div>
<div className="text-center py-2 text-outline/30 text-label-md">30</div>

<div className="relative flex flex-col items-center justify-center py-2 text-label-md">1 <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1"></span></div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md">2</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md">3</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md bg-surface-container rounded-lg">4</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md bg-surface-container rounded-lg">5</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md">6 <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1"></span></div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md">7</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md">8 <span className="w-1.5 h-1.5 rounded-full bg-error mt-1"></span></div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md">9</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md">10</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md bg-surface-container rounded-lg">11</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md bg-surface-container rounded-lg">12</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md bg-primary/10 text-primary font-bold rounded-lg border border-primary/20">13 <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1"></span></div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md">14</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md">15</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md">16</div>
<div className="relative flex flex-col items-center justify-center py-2 text-label-md">17</div>
<div className="relative flex flex-center py-2 text-label-md bg-surface-container rounded-lg">18</div>
<div className="relative flex flex-center py-2 text-label-md bg-surface-container rounded-lg">19</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md space-y-md animate-fade-in" style={{ animationDelay: '0.1s' }}>
<div className="space-y-sm">
<label className="text-label-sm font-label-sm text-outline block">Leave Type</label>
<select className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
<option>Annual Leave</option>
<option>Sick Leave</option>
<option>Casual Leave</option>
</select>
</div>
<div className="grid grid-cols-2 gap-sm">
<div className="space-y-sm">
<label className="text-label-sm font-label-sm text-outline block">Start Date</label>
<input className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md text-on-surface" type="date" value="2024-05-13" />
</div>
<div className="space-y-sm">
<label className="text-label-sm font-label-sm text-outline block">End Date</label>
<input className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-3 text-body-md text-on-surface" type="date" value="2024-05-15" />
</div>
</div>
<button className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold text-label-md hover:bg-surface-tint transition-colors active:scale-[0.98] duration-100">
                    Check Eligibility
                </button>
</section>

<section className="grid grid-cols-2 gap-sm animate-fade-in" style={{ animationDelay: '0.2s' }}>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
<p className="text-label-sm font-label-sm text-on-secondary-container">Remaining</p>
<div className="flex items-baseline gap-2 mt-2">
<span className="text-headline-md font-headline-md text-on-surface">12</span>
<span className="text-label-sm font-label-sm text-outline">days</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-4">
<div className="bg-tertiary h-full rounded-full" style={{ width: '60%' }}></div>
</div>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
<p className="text-label-sm font-label-sm text-on-secondary-container">Attendance</p>
<div className="flex items-baseline gap-2 mt-2">
<span className="text-headline-md font-headline-md text-on-surface">92%</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-4">
<div className="bg-primary h-full rounded-full" style={{ width: '92%' }}></div>
</div>
</div>
</section>

<section className="bg-primary-container text-on-primary-container rounded-xl p-md overflow-hidden relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
<div className="relative z-10">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: '"FILL" 1' }}>auto_awesome</span>
<h3 className="text-label-md font-label-md">Leave Prediction</h3>
</div>
<p className="text-body-md mb-4 opacity-90">Based on your current attendance trend, taking 3 days off in May will maintain an 88% attendance rate.</p>
<div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex justify-between items-center">
<span className="text-label-sm">Safe to proceed</span>
<span className="material-symbols-outlined text-tertiary-fixed">check_circle</span>
</div>
</div>

<div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
</section>
</div>
</main>

<nav className="fixed bottom-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-md flex md:hidden items-center justify-around z-40">
<a className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-label-sm font-label-sm">Dashboard</span>
</a>
<a className="flex flex-col items-center gap-1 text-primary font-bold transition-all" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>calendar_month</span>
<span className="text-label-sm font-label-sm">Leave</span>
</a>
<a className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-all" href="#">
<span className="material-symbols-outlined">person</span>
<span className="text-label-sm font-label-sm">Profile</span>
</a>
</nav>

<footer className="hidden md:flex justify-between items-center py-md px-lg mt-xl ml-[280px] w-[calc(100%-280px)] border-t border-outline-variant bg-surface">
<span className="text-label-sm font-label-sm text-on-surface-variant">© 2024 MultiHolidays. All rights reserved.</span>
<div className="flex gap-6">
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Terms and Conditions</a>
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Meet the Creator</a>
</div>
</footer>



</>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="bg-surface">
          <>


<aside className="w-[280px] h-screen fixed left-0 top-0 bg-surface  border-r border-outline-variant  flex flex-col py-md px-sm z-50">
<div className="mb-xl px-sm">
<h1 className="text-headline-md font-headline-md font-bold text-primary ">MultiHolidays</h1>
<p className="text-label-sm font-label-sm text-on-surface-variant">Attendance Planning</p>
</div>
<nav className="flex-grow space-y-1">

<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant  hover:text-primary hover:bg-surface-container-high  transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="text-body-md font-body-md">Dashboard</span>
</a>

<a className="flex items-center gap-sm px-md py-sm rounded-lg text-primary font-bold border-r-4 border-primary bg-secondary-container/30  scale-95 duration-100" href="#">
<span className="material-symbols-outlined" data-icon="calendar_month" style={{ fontVariationSettings: '"FILL" 1' }}>calendar_month</span>
<span className="text-body-md font-body-md">Leave Calendar</span>
</a>

<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant  hover:text-primary hover:bg-surface-container-high  transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="text-body-md font-body-md">Profile</span>
</a>
</nav>
<div className="mt-auto space-y-1 border-t border-outline-variant pt-md">
<button className="w-full mb-md py-2.5 px-md bg-primary text-on-primary rounded-lg font-bold text-body-md hover:opacity-90 active:scale-95 transition-all">
                Apply for Leave
            </button>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="text-label-md font-label-md">Settings</span>
</a>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
<span className="text-label-md font-label-md">Help</span>
</a>
</div>
</aside>

<header className="fixed top-0 right-0 left-[280px] h-16 bg-surface/80 backdrop-blur-md  border-b border-outline-variant  flex justify-between items-center px-lg z-40">
<h2 className="text-headline-md font-headline-md text-on-surface ">Leave Calendar</h2>
<div className="flex items-center gap-md">
<button className="hover:bg-surface-container-low  rounded-full p-2 text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<div className="flex items-center gap-sm cursor-pointer hover:bg-surface-container-low rounded-full pl-2 pr-4 py-1">
<img className="w-8 h-8 rounded-full border border-outline-variant object-cover" data-alt="A professional headshot of a diverse male student in his early 20s wearing a simple white college sweater, smiling warmly in a bright, modern studio with soft daylight. The image has a clean, premium academic feel with a shallow depth of field, maintaining the modern corporate aesthetic of the MultiHolidays brand." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDx7kbb9ys2eQvwxAU3cM-cn7Wkqdr3T4wGW1DisZUK9eILShpHUBKSg0AAkMvX6jLLHb-24h4lJUKyoo-nGtkJB9XZZ5GfW9KlyhpXEus2vIIDVzmdBM3aViljDASjhdYxoFqzZPr8BeF6I3unxUEJNFgKfJOddbCOJLNB4SDcYX1e5wgGjB_RV7U4BZXYEVQBolIZERIXSKPedMJMVzJerAfTGSkD8W-8soMD2__WBDEsRryjNz8ehQ" />
<span className="text-label-md font-label-md text-on-surface">Alex Chen</span>
</div>
</div>
</header>

<main className="ml-[280px] mt-16 p-lg pb-xl min-h-[calc(100vh-64px)]">
<div className="max-w-container-max mx-auto">

<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-xl">
<div className="flex gap-sm">
<button className="bg-primary text-on-primary px-lg py-2.5 rounded-lg font-bold text-body-md shadow-sm hover:translate-y-[-2px] hover:shadow-md active:scale-95 transition-all flex items-center gap-2" id="checkLeaveBtn">
<span className="material-symbols-outlined" data-icon="fact_check">fact_check</span>
                        Check leave
                    </button>
</div>
<div className="flex items-center gap-base bg-surface-container-lowest border border-outline-variant p-1 rounded-xl shadow-sm w-full md:w-auto">
<div className="relative flex-grow">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline" data-icon="date_range">date_range</span>
<input className="pl-10 pr-4 py-2 bg-transparent border-none focus:ring-0 text-body-md w-full md:w-64 placeholder:text-outline" placeholder="Enter No. of days leave needed.." type="number" />
</div>
<button className="bg-primary text-on-primary px-md py-2 rounded-lg font-bold text-label-md hover:bg-on-primary-fixed-variant transition-colors">
                        Check
                    </button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">

<div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
<div className="flex items-center justify-between mb-lg">
<div className="flex items-center gap-sm">
<h3 className="text-headline-md font-headline-md text-on-surface">October 2024</h3>
</div>
<div className="flex gap-2">
<button className="p-2 hover:bg-surface-container-high rounded-lg text-outline">
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-outline">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
<div className="calendar-grid mb-md">

<div className="text-center text-label-sm font-label-sm text-outline uppercase tracking-wider py-2">Sun</div>
<div className="text-center text-label-sm font-label-sm text-outline uppercase tracking-wider py-2">Mon</div>
<div className="text-center text-label-sm font-label-sm text-outline uppercase tracking-wider py-2">Tue</div>
<div className="text-center text-label-sm font-label-sm text-outline uppercase tracking-wider py-2">Wed</div>
<div className="text-center text-label-sm font-label-sm text-outline uppercase tracking-wider py-2">Thu</div>
<div className="text-center text-label-sm font-label-sm text-outline uppercase tracking-wider py-2">Fri</div>
<div className="text-center text-label-sm font-label-sm text-outline uppercase tracking-wider py-2">Sat</div>

<div className="date-card flex items-center justify-center opacity-0 pointer-events-none"></div>
<div className="date-card flex items-center justify-center opacity-0 pointer-events-none"></div>


<div className="date-card relative flex flex-col items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer">
<span className="text-body-md font-bold">01</span>
<span className="material-symbols-outlined text-tertiary text-sm absolute bottom-2" data-icon="check_circle" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
</div>
<div className="date-card relative flex flex-col items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer">
<span className="text-body-md font-bold">02</span>
<span className="material-symbols-outlined text-tertiary text-sm absolute bottom-2" data-icon="check_circle" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
</div>
<div className="date-card relative flex flex-col items-center justify-center border border-outline-variant/30 rounded-lg bg-error-container/30 border-error/20 cursor-pointer">
<span className="text-body-md font-bold text-on-error-container">03</span>
<span className="material-symbols-outlined text-error text-sm absolute bottom-2" data-icon="cancel" style={{ fontVariationSettings: '"FILL" 1' }}>cancel</span>
</div>
<div className="date-card relative flex flex-col items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer">
<span className="text-body-md font-bold">04</span>
<span className="material-symbols-outlined text-tertiary text-sm absolute bottom-2" data-icon="check_circle" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
</div>
<div className="date-card relative flex flex-col items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer">
<span className="text-body-md font-bold">05</span>
<span className="material-symbols-outlined text-tertiary text-sm absolute bottom-2" data-icon="check_circle" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
</div>

<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">06</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">07</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">08</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">09</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-primary/10 border-primary cursor-pointer ring-2 ring-primary/50"><span className="text-body-md font-bold text-primary">10</span><span className="text-[10px] absolute top-1 right-1 font-bold text-primary">TODAY</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">11</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">12</span></div>

<div className="date-card flex items-center justify-center border-2 border-dashed border-primary bg-primary-container/20 rounded-lg cursor-pointer group hover:bg-primary-container/30">
<span className="text-body-md font-bold text-primary">13</span>
<span className="material-symbols-outlined text-primary text-[14px] absolute bottom-1 opacity-0 group-hover:opacity-100 transition-opacity" data-icon="add_circle">add_circle</span>
</div>
<div className="date-card flex items-center justify-center border-2 border-dashed border-primary bg-primary-container/20 rounded-lg cursor-pointer group hover:bg-primary-container/30">
<span className="text-body-md font-bold text-primary">14</span>
<span className="material-symbols-outlined text-primary text-[14px] absolute bottom-1 opacity-0 group-hover:opacity-100 transition-opacity" data-icon="add_circle">add_circle</span>
</div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">15</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">16</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">17</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">18</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">19</span></div>

<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">20</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">21</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">22</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">23</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">24</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">25</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">26</span></div>

<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">27</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">28</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">29</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">30</span></div>
<div className="date-card flex items-center justify-center border border-outline-variant/30 rounded-lg bg-surface-container-low/50 cursor-pointer"><span className="text-body-md font-bold">31</span></div>
</div>
<div className="flex flex-wrap gap-md mt-md p-sm bg-surface rounded-lg">
<div className="flex items-center gap-2">
<div className="w-4 h-4 rounded bg-tertiary-container border border-tertiary"></div>
<span className="text-label-sm font-label-sm text-outline">Present</span>
</div>
<div className="flex items-center gap-2">
<div className="w-4 h-4 rounded bg-error-container border border-error"></div>
<span className="text-label-sm font-label-sm text-outline">Absent</span>
</div>
<div className="flex items-center gap-2">
<div className="w-4 h-4 rounded border-2 border-dashed border-primary bg-primary-container/20"></div>
<span className="text-label-sm font-label-sm text-outline">Recommended Leave</span>
</div>
<div className="flex items-center gap-2">
<div className="w-4 h-4 rounded bg-surface-container-low border border-outline-variant/30"></div>
<span className="text-label-sm font-label-sm text-outline">Upcoming Class</span>
</div>
</div>
</div>

<div className="lg:col-span-4 space-y-lg">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md shadow-sm">
<h4 className="text-headline-md font-headline-md text-on-surface mb-md">Quick Stats</h4>
<div className="space-y-md">
<div className="p-sm bg-surface-container-low rounded-lg border border-outline-variant/30">
<p className="text-label-sm font-label-sm text-outline uppercase mb-1">Current Attendance</p>
<div className="flex items-end gap-1">
<span className="text-headline-lg font-bold text-primary">82.5%</span>
<span className="text-label-sm text-tertiary pb-1 flex items-center"><span className="material-symbols-outlined text-[14px]" data-icon="trending_up">trending_up</span> +2.1%</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full mt-2 overflow-hidden">
<div className="bg-primary h-full w-[82.5%] rounded-full"></div>
</div>
</div>
<div className="p-sm bg-surface-container-low rounded-lg border border-outline-variant/30">
<p className="text-label-sm font-label-sm text-outline uppercase mb-1">Leaves Taken</p>
<span className="text-headline-md font-bold text-on-surface">04 <span className="text-label-md font-normal text-outline">/ 12 days</span></span>
</div>
</div>
</div>

<div className="bg-primary text-on-primary rounded-xl p-md shadow-lg overflow-hidden relative">
<div className="relative z-10">
<h4 className="text-body-lg font-bold mb-md">Leave Prediction</h4>
<p className="text-label-md text-on-primary-container mb-md">If you take 2 days leave on Oct 13-14, your attendance will drop to:</p>
<div className="text-headline-xl font-bold mb-sm">79.2%</div>
<div className="flex items-center gap-2 bg-on-primary/20 px-3 py-2 rounded-lg">
<span className="material-symbols-outlined text-white" data-icon="warning">warning</span>
<span className="text-label-sm font-medium">Critical: Below 80% threshold</span>
</div>
</div>
<div className="absolute -right-8 -bottom-8 opacity-20">
<span className="material-symbols-outlined text-[120px]" data-icon="analytics">analytics</span>
</div>
</div>
</div>
</div>
</div>
</main>

<footer className="ml-[280px] w-[calc(100%-280px)] border-t border-outline-variant  bg-surface  flex justify-between items-center py-md px-lg mt-xl">
<div className="flex flex-col">
<span className="text-label-md font-label-md font-bold text-on-surface">MultiHolidays</span>
<p className="text-label-sm font-label-sm text-on-surface-variant">© 2024 MultiHolidays. All rights reserved.</p>
</div>
<div className="flex gap-lg">
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Terms and Conditions</a>
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Meet the Creator</a>
</div>
</footer>


</>
        </div>
      </div>
    </div>
  );
}
