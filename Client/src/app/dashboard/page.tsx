
import React from 'react';

export default function DashboardPage() {
  return (
    <div className="w-full h-full min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        
        body {
            background-color: #f7f9fb;
            font-family: 'Hanken Grotesk', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
    

    body {
      min-height: max(884px, 100dvh);
    }
  
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            vertical-align: middle;
        }
        body {
            background-color: #f7f9fb;
        }
        .bento-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .bento-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
        }
    
      ` }} />
      <div className="block md:hidden">
        <div className="text-on-background min-h-screen pb-24">
          <>


<header className="fixed top-0 left-0 right-0 h-16 z-50 bg-surface/80 backdrop-blur-md flex justify-between items-center px-sm md:px-lg">
<div className="flex items-center gap-xs">
<span className="text-headline-md font-headline-md font-bold text-primary">MultiHolidays</span>
</div>
<div className="flex items-center gap-xs">
<button className="hover:bg-surface-container-low rounded-full p-2 transition-opacity active:opacity-80">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
<div className="w-8 h-8 rounded-full bg-secondary-container overflow-hidden">
<img className="w-full h-full object-cover" data-alt="A professional studio portrait of a university student with a friendly expression, soft natural lighting, set against a clean minimalist academic background with muted blue and white tones to match the corporate identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIrlEly0VXXD7mApSAT2VUYRTsh10fKgky2OQkPkH8IG4mT9OyQFIoa9-T1ldxvqeuIkwZOaPOZhAOOC2pORG_RhbQQk4ECuGRdztXYVOclW7vVr1YvNgwayx8XENCNZrzAQhcZkSxv5y2N7lFxzKrI4LikUF__rI7LGsXfXYjH4E2sBt_yNmQpcB7P9Q9hG2WGp9Q4devRV-RXerhLVwcyUpFj1k_WzVhHyVsQCMMcIfqPHPQ2EM8pA" />
</div>
</div>
</header>
<main className="pt-20 px-sm space-y-md">

<section className="relative overflow-hidden rounded-xl bg-primary-container p-md text-on-primary-container">
<div className="relative z-10">
<p className="font-label-sm text-label-sm uppercase tracking-wider opacity-80 mb-base">Dashboard Overview</p>
<h1 className="font-headline-lg text-headline-lg mb-xs">Welcome back, Alex</h1>
<p className="font-body-md text-body-md opacity-90 max-w-[80%]">You're on track! Your attendance is currently above the 75% threshold.</p>
</div>

<div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
<div className="absolute right-4 top-4 opacity-20">
<span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: '"FILL" 1' }}>school</span>
</div>
</section>

<section className="space-y-sm">
<h2 className="font-headline-md text-headline-md px-base">Academic Metrics</h2>
<div className="grid grid-cols-1 gap-sm">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center justify-between hover:translate-y-[-2px] transition-all duration-200">
<div>
<p className="font-label-md text-label-md text-on-surface-variant">Overall Attendance</p>
<h3 className="font-headline-xl text-headline-xl text-primary mt-xs">88.5%</h3>
</div>
<div className="relative flex items-center justify-center w-20 h-20">
<svg className="w-full h-full transform -rotate-90">
<circle className="text-surface-container-high" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeWidth="8"></circle>
<circle className="text-tertiary" cx="40" cy="40" fill="transparent" r="34" stroke="currentColor" strokeDasharray="213.6" stroke-dashoffset="24.5" strokeWidth="8"></circle>
</svg>
<span className="absolute material-symbols-outlined text-tertiary" style={{ fontVariationSettings: '"FILL" 1' }}>check_circle</span>
</div>
</div>

<div className="grid grid-cols-2 gap-sm">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
<span className="material-symbols-outlined text-primary mb-xs">event_available</span>
<p className="font-label-sm text-label-sm text-on-surface-variant">Days Present</p>
<p className="font-headline-md text-headline-md">115</p>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md">
<span className="material-symbols-outlined text-error mb-xs">event_busy</span>
<p className="font-label-sm text-label-sm text-on-surface-variant">Days Absent</p>
<p className="font-headline-md text-headline-md">12</p>
</div>
</div>

<div className="bg-secondary-container/30 border border-primary/10 rounded-xl p-md flex items-center gap-md">
<div className="bg-primary text-on-primary w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0">
<span className="font-label-sm text-[10px] leading-none uppercase">Oct</span>
<span className="font-headline-md text-headline-md leading-none">24</span>
</div>
<div>
<p className="font-label-md text-label-md text-primary font-bold">Today's Schedule</p>
<p className="font-body-md text-body-md text-on-surface">3 Lectures Scheduled</p>
</div>
<span className="material-symbols-outlined ml-auto text-on-surface-variant">chevron_right</span>
</div>
</div>
</section>

<section className="space-y-sm">
<div className="flex justify-between items-end px-base">
<h2 className="font-headline-md text-headline-md">Announcements</h2>
<button className="text-primary font-label-md text-label-md hover:underline transition-all">View All</button>
</div>
<div className="flex overflow-x-auto gap-md no-scrollbar pb-xs snap-x">

<div className="snap-start shrink-0 w-[85%] bg-surface-container-low border border-outline-variant rounded-xl p-md flex flex-col justify-between">
<div>
<div className="flex items-center gap-xs mb-sm">
<span className="material-symbols-outlined text-tertiary">info</span>
<span className="font-label-md text-label-md text-tertiary uppercase font-bold">Important Note</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
                            Mid-term attendance reviews are scheduled for next week. Please ensure all medical leaves are documented.
                        </p>
</div>
<button className="mt-md font-label-sm text-label-sm text-primary flex items-center gap-xs">
                        Read Policy <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>

<div className="snap-start shrink-0 w-[85%] relative h-[200px] rounded-xl overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
<img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="A stunning wide-angle architectural shot of a modern glass-and-steel university library during the golden hour. The lighting is warm and inviting, highlighting the clean geometric lines of the building. The overall atmosphere is scholarly and inspiring, following a high-end corporate architectural photography style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuALzT6df12VIgU9i4zo_gVk_ZxRQxDHixFbmDUgsMknDCY-boqk6-HbzjdksvCNagrMjadrURfhXId2hXCpDOjpeSS0qQkOlSFjmERZLWOiQ8c9hHw1G4qmyV6cCqgGFkz_vzH8ENBnJj5vFV66hK1wfKuDuBtVkgyX8rzeMfG0LXRLl0D1eKsx0_6o1QZ5r-VtkeXg0jUCSn7J00btXNXR6_ELIw3C4z5kFKrQ6AhBkWVXdUAK9E_uIQ" />
<div className="absolute bottom-md left-md z-20 text-white">
<p className="font-label-sm text-label-sm uppercase tracking-wider opacity-80">Campus Life</p>
<p className="font-headline-sm text-body-lg font-bold">Central Library Annex</p>
</div>
</div>

<div className="snap-start shrink-0 w-[85%] relative h-[200px] rounded-xl overflow-hidden group">
<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
<img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="An expansive aerial view of a pristine university campus park with lush green lawns and organized paved walkways. Sunlight filters through rows of trees, creating long soft shadows. The scene communicates a sense of order, peacefulness, and high-performance academic environment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1uoDWzhRb4vHDUfYIdR_d_wzZG6xynK8FMoc0QnQgIGaG4xmrRY5sqjlkBs3MXSZ-L-3s709iJ4_mShjYTRbpK_YTaYP0zHIb-O337k_EAm7Bk6_enjYnwRfsVGs0DtdFSuDTodDZvOM5c9Ni-WzOz7TJu0kC-dDk9Jv9dy4OOggJBSKXjIBobBdURxHMAsS8opNHFSKmBTQfUHxccQRBVYJt_dSUImXJwhZRMPgsiSmKy6aQ7ci1NA" />
<div className="absolute bottom-md left-md z-20 text-white">
<p className="font-label-sm text-label-sm uppercase tracking-wider opacity-80">Campus Life</p>
<p className="font-headline-sm text-body-lg font-bold">Student Commons</p>
</div>
</div>
</div>
</section>

<section className="space-y-sm">
<h2 className="font-headline-md text-headline-md px-base">Recent Attendance</h2>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant overflow-hidden">
<div className="p-sm flex items-center justify-between hover:bg-surface-container transition-colors cursor-pointer">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-tertiary-container/10 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary">check</span>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface">Mathematics II</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">Yesterday, 09:00 AM</p>
</div>
</div>
<span className="font-label-sm text-label-sm text-tertiary bg-tertiary-fixed-dim/20 px-2 py-1 rounded">Present</span>
</div>
<div className="p-sm flex items-center justify-between hover:bg-surface-container transition-colors cursor-pointer">
<div className="flex items-center gap-sm">
<div className="w-10 h-10 rounded-full bg-error-container/10 flex items-center justify-center">
<span className="material-symbols-outlined text-error">close</span>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface">Data Structures</p>
<p className="font-label-sm text-label-sm text-on-surface-variant">Oct 22, 11:30 AM</p>
</div>
</div>
<span className="font-label-sm text-label-sm text-error bg-error-container/20 px-2 py-1 rounded">Absent</span>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-lg border-t border-outline-variant z-50 flex justify-around items-center h-20 px-sm md:hidden">

<a className="flex flex-col items-center gap-1 flex-1 text-primary active:scale-95 transition-all duration-100" href="#">
<div className="bg-secondary-container/30 px-5 py-1 rounded-full">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>dashboard</span>
</div>
<span className="font-label-sm text-label-sm font-bold">Dashboard</span>
</a>

<a className="flex flex-col items-center gap-1 flex-1 text-on-surface-variant hover:text-primary active:scale-95 transition-all duration-100" href="#">
<span className="material-symbols-outlined">calendar_month</span>
<span className="font-label-sm text-label-sm">Calendar</span>
</a>

<a className="flex flex-col items-center gap-1 flex-1 text-on-surface-variant hover:text-primary active:scale-95 transition-all duration-100" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-sm text-label-sm">Profile</span>
</a>
</nav>

<button className="fixed bottom-24 right-sm bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-all z-40">
<span className="material-symbols-outlined text-[32px]">add</span>
</button>
<footer className="mt-xl px-lg py-md text-center border-t border-outline-variant bg-surface">
<p className="font-label-sm text-label-sm text-secondary">© 2024 MultiHolidays. All rights reserved.</p>
<div className="flex justify-center gap-md mt-sm">
<a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Terms and Conditions</a>
<a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors" href="#">Meet the Creator</a>
</div>
</footer>


</>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="font-body-md text-on-surface">
          <>


<aside className="w-[280px] h-screen fixed left-0 top-0 bg-surface border-r border-outline-variant flex flex-col h-full py-md px-sm z-50">
<div className="mb-xl px-sm">
<h1 className="text-headline-md font-headline-md font-bold text-primary">MultiHolidays</h1>
<p className="text-label-sm font-label-sm text-on-surface-variant">Attendance Planning</p>
</div>
<nav className="flex-grow space-y-base">
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-primary font-bold border-r-4 border-primary bg-secondary-container/30 transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-label-md text-label-md">Dashboard</span>
</a>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="calendar_month">calendar_month</span>
<span className="font-label-md text-label-md">Leave Calendar</span>
</a>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label-md text-label-md">Profile</span>
</a>
</nav>
<div className="mt-auto space-y-base border-t border-outline-variant pt-md">
<button className="w-full mb-md bg-primary text-on-primary py-2.5 rounded-lg font-label-md hover:opacity-90 active:scale-95 transition-all">
                Apply for Leave
            </button>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-label-md text-label-md">Settings</span>
</a>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined" data-icon="help">help</span>
<span className="font-label-md text-label-md">Help</span>
</a>
</div>
</aside>

<header className="fixed top-0 right-0 left-[280px] h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-lg z-40">
<h2 className="text-headline-md font-headline-md text-on-surface">Your Dashboard</h2>
<div className="flex items-center gap-md">
<div className="flex items-center gap-xs text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 cursor-pointer transition-opacity active:opacity-80">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</div>
<div className="flex items-center gap-sm bg-surface-container rounded-full pl-base pr-md py-base border border-outline-variant hover:bg-surface-container-high cursor-pointer transition-colors">
<img className="w-8 h-8 rounded-full object-cover shadow-sm" data-alt="A professional headshot of a young female student with a friendly expression, set against a soft academic campus background. The lighting is bright and natural, reflecting a modern corporate clean aesthetic with soft shadows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbxpfzYth4wBFaB9fb6Z16bOBf7uU7AClergHGW9X1IfwWIyNv7EMgUvg5Grgqkfh8zwdt5C_D5_l5p4UkiF3iYSJdOKb2vHGhNq-Xrj_SykfWdAAjZbuT9ki2bt0d5mkz3ntu4KbdgLXidy3p9T2srCAAKe29BZTjRhvllY9GfwPSnny8dHt5x0yNW2vBnMcqpP7F1dymE_ivr_nhckGn80Pr1fYhMDGwKpayN5x4nfcVgsXj9Vy6nQ" />
<span className="font-label-md text-label-md text-on-surface">Hello, Natasha</span>
</div>
</div>
</header>

<main className="ml-[280px] pt-24 px-lg min-h-screen">

<section className="mb-xl">
<div className="bg-primary-container p-lg rounded-xl text-on-primary-container relative overflow-hidden flex items-center justify-between">
<div className="relative z-10 max-w-[576px]">
<h3 className="text-headline-lg font-headline-lg mb-xs">Welcome back, Natasha!</h3>
<p className="text-body-md font-body-md opacity-90">Your academic journey is on track. Keep maintaining your presence to ensure a smooth semester end.</p>
</div>
<div className="hidden lg:block relative z-10 opacity-20 transform translate-x-4">
<span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: '"FILL" 1' }}>school</span>
</div>
<div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md mb-xl">

<div className="bento-card bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between">
<div className="flex justify-between items-start mb-sm">
<span className="text-label-md font-label-md text-on-surface-variant">Current Percentage</span>
<span className="material-symbols-outlined text-tertiary" data-icon="analytics">analytics</span>
</div>
<div className="flex items-baseline gap-xs">
<span className="text-headline-xl font-headline-xl text-on-surface">75%</span>
<span className="text-label-sm font-label-sm text-tertiary font-bold">+2% from last week</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full mt-md overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{ width: '75%' }}></div>
</div>
</div>

<div className="bento-card bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between">
<div className="flex justify-between items-start mb-sm">
<span className="text-label-md font-label-md text-on-surface-variant">Days Present</span>
<span className="material-symbols-outlined text-primary" data-icon="event_available">event_available</span>
</div>
<div>
<span className="text-headline-xl font-headline-xl text-on-surface">25</span>
<span className="text-body-md font-body-md text-on-surface-variant ml-xs">days</span>
</div>
<div className="mt-md text-label-sm font-label-sm text-on-surface-variant opacity-70">
                    Target: 32 days
                </div>
</div>

<div className="bento-card bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between">
<div className="flex justify-between items-start mb-sm">
<span className="text-label-md font-label-md text-on-surface-variant">Days Absent</span>
<span className="material-symbols-outlined text-error" data-icon="event_busy">event_busy</span>
</div>
<div>
<span className="text-headline-xl font-headline-xl text-on-surface">4</span>
<span className="text-body-md font-body-md text-on-surface-variant ml-xs">days</span>
</div>
<div className="mt-md text-label-sm font-label-sm text-error font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="warning">warning</span>
                    Max allowed: 7
                </div>
</div>

<div className="bento-card bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between">
<div className="flex justify-between items-start mb-sm">
<span className="text-label-md font-label-md text-on-surface-variant">Current Day</span>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="today">today</span>
</div>
<div>
<span className="text-headline-xl font-headline-xl text-on-surface">30</span>
<span className="text-body-md font-body-md text-on-surface-variant ml-xs">of Semester</span>
</div>
<div className="mt-md">
<div className="flex justify-between text-label-sm font-label-sm text-on-surface-variant mb-1">
<span>Day 30</span>
<span>Day 90</span>
</div>
<div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
<div className="bg-primary h-full" style={{ width: '33.3%' }}></div>
</div>
</div>
</div>
</section>

<section className="mb-xl">
<div className="bg-surface-container p-md rounded-lg border border-outline-variant/50">
<div className="flex gap-sm items-start">
<span className="material-symbols-outlined text-on-surface-variant mt-1" data-icon="info">info</span>
<div>
<h4 className="text-label-md font-label-md text-on-surface font-bold mb-xs">Note for Students</h4>
<p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                            The values on MultiHolidays are approximate calculations based on the details provided by the college. 
                            Attendance figures can vary due to recent entries or pending administrative updates. Please contact the academic office for official records.
                        </p>
</div>
</div>
</div>
</section>

<section className="mb-xl grid grid-cols-1 md:grid-cols-2 gap-md">
<div className="h-64 rounded-xl overflow-hidden relative group">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A futuristic, clean classroom environment with minimal furniture, glowing blue accent lighting, and large digital screens displaying attendance charts. The style is modern corporate, organized, and encouraging, with a soft daylight glow coming from invisible windows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuChngRqIv1cM9JW3fO2dFXyGSa5Wfb1lnLN_PsDs4TfnGAG5NClhzRoP0ZA0kWXYZwSJCDM414wvK5_HfkrbzgohY_Ox413Kc38Z-nDNXlga8z4rfzvHtcpJPcnZ6YLkXt8TcRFcCjSmai37oWKemCSGxc8KiDdqXULkjQV32oyikHOQ60frWcJ8jG7C89zkoxluJQZF4ChKaziUqzLmyiIhV2NPs2Yg0jSWxyxe375YnXhvu0b5IKSuw" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
<h5 className="text-white font-headline-md text-headline-md">College Campus View</h5>
<p className="text-white/80 text-label-md font-label-md">Main Auditorium Schedule</p>
</div>
</div>
<div className="h-64 rounded-xl overflow-hidden relative group">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="A focused close-up of a student's hands typing on a high-end laptop with clear, organized dashboard graphics on the screen. The setting is a minimalist library with light oak wood textures and soft focus academic books in the background. High-key lighting, bright and professional atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAI6lsH0_TWMgY4BDofedZ5srEUt3taYRt6I7xdVsnsXFF05RAm5FjC52lo0iYtbzihIV1aPPH7SJcg6S76zD_F0Yazafp41lZL8GepShdsGL9bWmS15mPfryWNyDjNq5tq1YMUJENIYkmW5j7VD15mfVzIPPjIXjGB0OhPMaxuzRmbyl7jNKiebtZyghc8o24-YbO_T5e3R3W2w-VMh7yy6t8NF9UZus8kY8aPE9W4kVEHFAfERygdMQ" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-md">
<h5 className="text-white font-headline-md text-headline-md">Study Planner</h5>
<p className="text-white/80 text-label-md font-label-md">Manage your daily tasks effectively</p>
</div>
</div>
</section>
</main>

<footer className="ml-[280px] w-[calc(100%-280px)] bg-surface border-t border-outline-variant flex justify-between items-center py-md px-lg mt-xl">
<div className="flex flex-col">
<span className="text-label-md font-label-md font-bold text-on-surface">MultiHolidays</span>
<p className="text-label-sm font-label-sm text-secondary">© 2024 MultiHolidays. All rights reserved.</p>
</div>
<div className="flex items-center gap-lg">
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Terms and Conditions</a>
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:underline transition-all font-bold" href="#">Meet the Creator: Mukesh G</a>
</div>
</footer>



</>
        </div>
      </div>
    </div>
  );
}
