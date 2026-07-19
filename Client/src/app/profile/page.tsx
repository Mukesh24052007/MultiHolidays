
import React from 'react';

export default function ProfilePage() {
  return (
    <div className="w-full h-full min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            font-family: 'Hanken Grotesk', sans-serif;
            -webkit-tap-highlight-color: transparent;
        }
        .tonal-card {
            background-color: #ffffff;
            border: 1px solid #E2E8F0;
        }
        .active-nav-item {
            color: #004ac6;
            font-weight: 700;
        }
    

    body {
      min-height: max(884px, 100dvh);
    }
  
        
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body {
            background-color: #f7f9fb;
            font-family: 'Hanken Grotesk', sans-serif;
        }
        .active-nav-transition {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
    
      ` }} />
      <div className="block md:hidden">
        <div className="bg-background text-on-surface min-h-screen pb-24">
          <>


<header className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md z-50 flex justify-between items-center px-sm">
<h1 className="text-headline-md font-headline-md font-bold text-on-surface">MultiHolidays</h1>
<div className="flex items-center gap-xs">
<button className="hover:bg-surface-container-low rounded-full p-2 transition-opacity active:opacity-80">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
</div>
</header>
<main className="pt-24 px-margin-mobile max-w-[448px] mx-auto">

<section className="flex flex-col items-center mb-xl">
<div className="relative group">
<div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-sm">
<img className="w-full h-full object-cover" data-alt="A professional studio portrait of a young adult student with a friendly smile, set against a clean, soft-lit professional background. The lighting is bright and airy, reflecting a modern corporate aesthetic with soft blue and white tones that match a high-end academic attendance portal interface. The image is crisp, centered, and radiates organized reliability." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3ClYUiSO2eK_5x7aUcwRZG5dTAiWbDEUPepMccjxaCRmpqLxPL62Rh3piYs3_hOYkDTvzIEBEsCcxcdQr-7OSPrpgF-kGcBH-MoPI7kcTSDlp8zeV5Gys4xtGcpkUAH1ssxXAA7LWYwKhzVviVz5WKmcCpxkHswxwqDzmIkLqP-ia7hxhx8JI-B4XZqbGx_NAEwjtuYGo1x7IrG_znJqKlttZWa8_nOAxBpG08LJp665NzpxKwuNpkQ" />
</div>
<div className="absolute bottom-0 right-0 bg-primary text-on-primary rounded-full p-1.5 border-2 border-white">
<span className="material-symbols-outlined text-sm">edit</span>
</div>
</div>
<button className="mt-md px-md py-xs border border-primary text-primary rounded-full font-label-md text-label-md hover:bg-primary/5 transition-colors active:scale-95 duration-100">
                Change pic
            </button>
<h2 className="mt-md text-headline-md font-headline-md text-on-surface">Alex Rivera</h2>
<p className="text-body-md font-body-md text-on-secondary-container">Senior Academic Year • ID 2024-0892</p>
</section>

<section className="mb-lg">
<h3 className="text-label-sm font-label-sm text-outline uppercase tracking-wider mb-sm">Account Information</h3>
<div className="tonal-card rounded-xl overflow-hidden">
<div className="p-md flex items-center justify-between border-b border-outline-variant/30">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-on-surface-variant">mail</span>
<div>
<p className="text-label-sm font-label-sm text-outline">Email Address</p>
<p className="text-body-md font-body-md">a.rivera@university.edu</p>
</div>
</div>
<span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
</div>
<div className="p-md flex items-center justify-between border-b border-outline-variant/30">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-on-surface-variant">school</span>
<div>
<p className="text-label-sm font-label-sm text-outline">Department</p>
<p className="text-body-md font-body-md">Computer Science</p>
</div>
</div>
</div>
<div className="p-md flex items-center justify-between">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-on-surface-variant">lock</span>
<p className="text-body-md font-body-md">Change Password</p>
</div>
<span className="material-symbols-outlined text-outline text-sm">chevron_right</span>
</div>
</div>
</section>

<section className="mb-lg">
<h3 className="text-label-sm font-label-sm text-outline uppercase tracking-wider mb-sm">System Status</h3>
<div className="tonal-card rounded-xl p-md">
<div className="flex items-center justify-between mb-md">
<div className="flex items-center gap-sm">
<div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></div>
<span className="text-body-md font-body-md">Attendance Sync</span>
</div>
<span className="text-label-sm font-label-sm text-[#10b981]">Active</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-sm">
<span className="material-symbols-outlined text-on-surface-variant">cloud_done</span>
<span className="text-body-md font-body-md">Last backup</span>
</div>
<span className="text-label-sm font-label-sm text-on-secondary-container">12 minutes ago</span>
</div>
</div>
</section>

<section className="mb-xl">
<button className="w-full bg-primary-container text-on-primary-container py-3 rounded-xl flex items-center justify-center gap-sm shadow-sm hover:brightness-110 transition-all active:scale-[0.98] duration-100">
<span className="material-symbols-outlined">download</span>
<span className="text-body-lg font-headline-md">Download Attendance Report</span>
</button>
<p className="text-center text-label-sm font-label-sm text-outline mt-sm">PDF Format • Academic Year 2023-24</p>
</section>

<footer className="flex flex-col items-center gap-xs py-md border-t border-outline-variant/30">
<p className="text-label-sm font-label-sm text-secondary">© 2024 MultiHolidays. All rights reserved.</p>
<div className="flex gap-md">
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface underline" href="#">Terms and Conditions</a>
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface underline" href="#">Meet the Creator</a>
</div>
</footer>
</main>

<nav className="fixed bottom-0 left-0 right-0 h-20 bg-surface border-t border-outline-variant/20 flex justify-around items-center px-xs z-50">
<a className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-label-sm font-label-sm">Dashboard</span>
</a>
<a className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">calendar_month</span>
<span className="text-label-sm font-label-sm">Calendar</span>
</a>
<a className="flex flex-col items-center gap-1 active-nav-item" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>person</span>
<span className="text-label-sm font-label-sm">Profile</span>
</a>
<a className="flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-label-sm font-label-sm">Settings</span>
</a>
</nav>


</>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="text-on-surface">
          <>


<aside className="w-[280px] h-screen fixed left-0 top-0 bg-surface border-r border-outline-variant flex flex-col py-md px-sm z-50">
<div className="mb-xl px-sm">
<h1 className="text-headline-md font-headline-md font-bold text-primary">MultiHolidays</h1>
<p className="text-label-md font-label-md text-on-surface-variant opacity-70">Attendance Planning</p>
</div>
<nav className="flex-1 space-y-base">
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 group active:scale-95 duration-100" href="#">
<span className="material-symbols-outlined group-hover:text-primary">dashboard</span>
<span className="text-label-md font-label-md">Dashboard</span>
</a>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200 group active:scale-95 duration-100" href="#">
<span className="material-symbols-outlined group-hover:text-primary">calendar_month</span>
<span className="text-label-md font-label-md">Leave Calendar</span>
</a>

<a className="flex items-center gap-sm px-md py-sm rounded-lg text-primary font-bold border-r-4 border-primary bg-secondary-container/30 active-nav-transition" href="#">
<span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>person</span>
<span className="text-label-md font-label-md">Profile</span>
</a>
</nav>
<div className="mt-auto space-y-base pt-md border-t border-outline-variant">
<button className="w-full mb-md bg-primary-container text-white py-2.5 rounded-lg font-bold text-label-md hover:opacity-90 active:scale-95 transition-all">
                Apply for Leave
            </button>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="text-label-md font-label-md">Settings</span>
</a>
<a className="flex items-center gap-sm px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-colors duration-200" href="#">
<span className="material-symbols-outlined">help</span>
<span className="text-label-md font-label-md">Help</span>
</a>
</div>
</aside>

<header className="fixed top-0 right-0 left-[280px] h-16 bg-surface/80 backdrop-blur-md border-b border-outline-variant z-40 flex justify-between items-center px-lg">
<div className="flex items-center gap-sm">
<span className="text-headline-sm font-headline-sm text-on-surface">Your Profile</span>
</div>
<div className="flex items-center gap-md">
<span className="text-body-md font-body-md text-on-surface-variant">Hello, <span className="font-bold text-on-surface">Natasha</span></span>
<button className="hover:bg-surface-container-low rounded-full p-2 active:opacity-80 transition-opacity">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
<img className="w-full h-full object-cover" data-alt="A professional close-up studio portrait of a young female student with a warm, encouraging smile. She is wearing a modern blue academic blazer, set against a soft, neutral-toned architectural background of a modern university library. The lighting is soft and cinematic, emphasizing a professional yet accessible student identity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmZHHWXII0oEnJOm-1RAoA3vPoO9dUanrghS8zLTIR5iAsVcxUUy8Qn9-ykHRl7sNycR448EGlNUftI9zREHdnhMa7RD-Sol9qmkf_9BMBKmoG-e1AE3NeAKO-KiC1oOMo9_r56L7LK9jtbZiqruTt0EoIzwov5kXdkJj-1lwb276iKVwFzjA-irEtS8GIdV-imW-m5c6qZP-vjKfNIIyPJuFtvv1QKuVZU24jvSD-fGJtKhSTXu53Iw" />
</div>
</div>
</header>

<main className="ml-[280px] pt-16 min-h-[calc(100vh-64px)] flex flex-col">
<div className="flex-1 p-xl">

<div className="max-w-4xl mx-auto space-y-lg">

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-xl flex flex-col items-center text-center shadow-sm relative overflow-hidden group">

<div className="absolute top-0 right-0 p-lg opacity-5">
<span className="material-symbols-outlined text-[120px]">person</span>
</div>

<div className="relative group cursor-pointer mb-md">
<div className="w-48 h-48 rounded-full border-4 border-primary/10 overflow-hidden shadow-lg group-hover:border-primary/30 transition-all">
<img className="w-full h-full object-cover" data-alt="A large, clear circular profile picture placeholder for a student portal. The image shows a friendly young woman with glasses and a professional demeanor, looking directly at the camera. The background is a blurred academic setting with warm wood tones and bright, natural window light, creating a sense of organized academic progress." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyTIzoa5SNVXI0EnZFFbvyso45JnO3e291bE87nyTT_7A6LDkyz3ntMRxB-ktwSA_XF1qdCiK7BeC23DbYxopitgI9S7d1ZlkOwEhQjQcWQ4YevzDWnv5AkPxG9dvr2V42qmAJDzRPGDu3PT1tkxmJIpxreKDBl-vSUMlRLoKcaqz8n9VTu0qLnSESyUXum1EwyUeBUHM5GILHstgmZ6_uzXQl2Y1dya-WXWkE-Q-TiJ3YTjmzlKn-hQ" />
</div>
<button className="absolute bottom-2 right-2 bg-primary text-white p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-transform">
<span className="material-symbols-outlined text-[20px]">photo_camera</span>
</button>
</div>
<h2 className="text-headline-md font-headline-md text-on-surface mb-xs">Natasha S</h2>
<p className="text-body-md font-body-md text-on-surface-variant mb-lg">Student • Faculty of Engineering</p>
<button className="px-lg py-2.5 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors active:scale-95">
                        Change pic
                    </button>
</section>

<div className="grid grid-cols-1 md:grid-cols-2 gap-lg">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md space-y-md">
<h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider">Account Information</h3>
<div className="space-y-sm">
<div className="group">
<label className="text-label-sm font-label-sm text-outline mb-1 block">Full Name</label>
<div className="flex items-center justify-between p-sm bg-surface-container rounded-lg border border-transparent group-hover:border-primary/20 transition-all">
<span className="text-body-md font-body-md text-on-surface">Natasha S</span>
<span className="material-symbols-outlined text-outline text-[18px]">edit</span>
</div>
</div>
<div className="group">
<label className="text-label-sm font-label-sm text-outline mb-1 block">Email Address</label>
<div className="flex items-center justify-between p-sm bg-surface-container rounded-lg border border-transparent group-hover:border-primary/20 transition-all">
<span className="text-body-md font-body-md text-on-surface">natashas@email.com</span>
<span className="material-symbols-outlined text-outline text-[18px]">lock</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-between">
<div>
<h3 className="text-label-md font-label-md text-on-surface-variant uppercase tracking-wider mb-md">System Status</h3>
<div className="p-md bg-secondary-container/20 rounded-lg border border-secondary-container/40">
<div className="flex items-center gap-sm text-on-secondary-container mb-xs">
<span className="material-symbols-outlined">verified</span>
<span className="font-bold">Profile Verified</span>
</div>
<p className="text-label-md font-label-md text-on-secondary-fixed-variant">All attendance calculations are synchronized with your college portal.</p>
</div>
</div>
<div className="mt-md">
<button className="w-full py-2.5 bg-surface-container-high hover:bg-surface-container-highest rounded-lg text-on-surface-variant font-bold text-label-md transition-colors flex items-center justify-center gap-xs">
<span className="material-symbols-outlined text-[18px]">download</span>
                                Download Attendance Report
                            </button>
</div>
</div>
</div>

<div className="p-md bg-surface-container-low rounded-lg border border-outline-variant/30">
<div className="flex items-start gap-sm">
<span className="material-symbols-outlined text-outline text-[20px] mt-0.5">info</span>
<p className="text-label-md font-label-md text-on-surface-variant leading-relaxed">
                            Note: The values on MultiHolidays is an approximate calculations of given details from the college. It can be vary. Please consult your faculty head for official leave balances.
                        </p>
</div>
</div>
</div>
</div>

<footer className="bg-surface border-t border-outline-variant flex justify-between items-center py-md px-lg">
<div className="text-label-sm font-label-sm text-secondary">
                © 2024 MultiHolidays. All rights reserved.
            </div>
<div className="flex gap-lg">
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Terms and Conditions</a>
<a className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Meet the Creator: Mukesh G</a>
</div>
</footer>
</main>


</>
        </div>
      </div>
    </div>
  );
}
