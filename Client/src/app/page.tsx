
import React from 'react';

export default function LoginPage() {
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
        .input-focus-ring:focus {
            outline: none;
            border-color: #004ac6;
            box-shadow: 0 0 0 2px rgba(0, 74, 198, 0.1);
        }
        /* Mobile specific layout lock */
        @media (max-width: 767px) {
            .mobile-container {
                min-height: 100dvh;
            }
        }
    

    body {
      min-height: max(884px, 100dvh);
    }
  
        
        body {
            background-color: #f7f9fb;
            font-family: 'Hanken Grotesk', sans-serif;
            overflow: hidden;
        }

        .login-card {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
            transition: transform 0.2s ease;
        }

        .login-card:hover {
            transform: translateY(-2px);
        }

        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        .floating-blob {
            position: absolute;
            filter: blur(80px);
            opacity: 0.15;
            z-index: -1;
            border-radius: 50%;
        }
    
      ` }} />
      <div className="block md:hidden">
        <div className="text-on-background">
          <>


<main className="mobile-container flex flex-col justify-center items-center px-sm py-xl max-w-[448px] mx-auto relative overflow-hidden">

<div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
<div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

<header className="w-full text-center mb-xl relative z-10">
<div className="flex flex-col items-center gap-xs">
<div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-md shadow-sm">
<span className="material-symbols-outlined text-white text-[40px]" style={{ fontVariationSettings: '"FILL" 1' }}>calendar_month</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-primary tracking-tight">MultiHolidays</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] mx-auto">
                    Secure student portal for attendance and academic leave management.
                </p>
</div>
</header>

<section className="w-full bg-surface-container-lowest p-md rounded-xl border border-outline-variant shadow-sm relative z-10">
<form action="#" className="space-y-md" method="POST">

<div className="space-y-xs">
<label className="font-label-md text-label-md text-on-surface" htmlFor="email">Institutional Email</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-md">mail</span>
<input className="w-full pl-[48px] pr-sm py-3 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md input-focus-ring transition-all placeholder:text-outline/50" id="email" name="email" placeholder="student@university.edu" required type="email" />
</div>
</div>

<div className="space-y-xs">
<div className="flex justify-between items-center">
<label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
<a className="font-label-sm text-label-sm text-primary hover:underline" href="#">Forgot?</a>
</div>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-md">lock</span>
<input className="w-full pl-[48px] pr-sm py-3 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md input-focus-ring transition-all placeholder:text-outline/50" id="password" name="password" placeholder="••••••••" required type="password" />
<button className="absolute right-sm top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors" type="button">
<span className="material-symbols-outlined text-md">visibility</span>
</button>
</div>
</div>

<button className="w-full py-3 px-lg bg-primary text-white font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-xs" type="submit">
                    Login to Dashboard
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</form>
<div className="mt-xl pt-md border-t border-outline-variant text-center">
<p className="font-body-md text-body-md text-on-surface-variant mb-sm">New to the system?</p>
<button className="w-full py-3 px-lg border border-primary text-primary font-label-md text-label-md rounded-lg hover:bg-primary/5 active:scale-[0.98] transition-all" type="button">
                    Apply for Access
                </button>
</div>
</section>

<footer className="mt-xl text-center space-y-md relative z-10">
<div className="flex items-center justify-center gap-md">
<a className="font-label-sm text-label-sm text-on-secondary-fixed-variant hover:text-on-surface transition-colors" href="#">Terms of Service</a>
<span className="w-1 h-1 bg-outline rounded-full"></span>
<a className="font-label-sm text-label-sm text-on-secondary-fixed-variant hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
</div>
<p className="font-label-sm text-label-sm text-outline">
                © 2024 MultiHolidays. All rights reserved.
            </p>
</footer>
</main>



</>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="min-h-screen flex items-center justify-center p-md">
          <>


<div className="fixed inset-0 pointer-events-none overflow-hidden">
<div className="floating-blob bg-primary w-[500px] h-[500px] -top-24 -left-24 animate-pulse"></div>
<div className="floating-blob bg-tertiary w-[400px] h-[400px] bottom-0 right-0 animate-bounce" style={{ animationDuration: '10s' }}></div>
</div>

<main className="w-full max-w-[440px] z-10">

<div className="text-center mb-xl">
<div className="flex items-center justify-center mb-sm">
<div className="bg-primary-container text-on-primary-container w-12 h-12 rounded-xl flex items-center justify-center mr-xs">
<span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: '"FILL" 1' }}>calendar_month</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">MultiHolidays</h1>
</div>
<p className="font-body-lg text-body-lg text-on-surface-variant">Welcome back</p>
</div>

<section className="login-card bg-surface-container-lowest border border-outline-variant rounded-xl p-lg">
<form className="space-y-md" id="loginForm">

<div className="space-y-xs">
<label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="email">Email</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">mail</span>
<input className="w-full pl-xl pr-md py-2.5 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline/60" id="email" name="email" placeholder="student@academy.edu" required type="email" />
</div>
</div>

<div className="space-y-xs">
<div className="flex justify-between items-center">
<label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="password">Password</label>
<a className="font-label-sm text-label-sm text-primary hover:underline transition-all" href="#">Forgot Password?</a>
</div>
<div className="relative">
<span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]">lock</span>
<input className="w-full pl-xl pr-xl py-2.5 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline/60" id="password" name="password" placeholder="••••••••" required type="password" />
<button className="absolute right-sm top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"  type="button">
<span className="material-symbols-outlined text-[20px]" id="passIcon">visibility</span>
</button>
</div>
</div>

<div className="flex items-center space-x-xs">
<input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" id="remember" type="checkbox" />
<label className="font-label-sm text-label-sm text-on-surface-variant select-none" htmlFor="remember">Remember this device</label>
</div>

<button className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-md text-label-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-xs" type="submit">
<span>Login</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</form>

<div className="mt-lg pt-lg border-t border-outline-variant text-center">
<p className="font-body-md text-body-md text-on-surface-variant mb-md">New to MultiHolidays?</p>
<button className="w-full border border-primary text-primary py-2.5 rounded-lg font-label-md text-label-md hover:bg-primary/5 active:bg-primary/10 transition-all">
                    Apply for Access
                </button>
</div>
</section>

<div className="mt-xl grid grid-cols-3 gap-md opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
<div className="flex flex-col items-center text-center space-y-xs">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant">verified</span>
</div>
<span className="font-label-sm text-label-sm">Academic Integrity</span>
</div>
<div className="flex flex-col items-center text-center space-y-xs">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant">schedule</span>
</div>
<span className="font-label-sm text-label-sm">Real-time Sync</span>
</div>
<div className="flex flex-col items-center text-center space-y-xs">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant">encrypted</span>
</div>
<span className="font-label-sm text-label-sm">Privacy First</span>
</div>
</div>

<footer className="mt-xl text-center">
<p className="font-label-sm text-label-sm text-outline">
                © 2024 MultiHolidays. All rights reserved.
            </p>
</footer>
</main>

<div className="hidden xl:block fixed right-xl top-xl bottom-xl w-[400px] overflow-hidden rounded-3xl border border-outline-variant">
<div className="absolute inset-0 bg-primary/5"></div>
<img className="w-full h-full object-cover" data-alt="A hyper-realistic close-up of a modern university building facade at sunset. The architectural style is minimalist with clean glass lines and soft interior lighting that feels warm and inviting. A gentle orange and blue gradient sky reflects off the windows. The overall atmosphere is professional, organized, and provides a sense of academic clarity." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2fYWqi2SzTYJloSomwkmydvePrVt0sZnbSXm4_ivTWttUK89HlAeO4ZRQyqzu8zZKGsDfd-f1JrTdYOLWyunblelyZlN-wvwyAq22LNijF2gDPNgPuAjSGkscTEp6pstrNmMoM_fqlnAOYzVk-4VXfbBFudq7ucLlLDJ4rPBQgtmrJfvRSijLDqhFVVKsXe88c-BbfR_-df7KX-J4nSpe97iIeGNATUG-YlPu_Ip44jsBLp4Q65B5uw" />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-lg">
<div>
<p className="text-white font-headline-md text-headline-md mb-xs">Reduce Attendance Anxiety</p>
<p className="text-white/80 font-body-md text-body-md">Empowering students with clear, actionable insights into their academic progress.</p>
</div>
</div>
</div>


</>
        </div>
      </div>
    </div>
  );
}
