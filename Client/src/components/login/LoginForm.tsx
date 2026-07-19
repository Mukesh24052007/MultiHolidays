'use client';

import Icon from '@/components/ui/Icon';

type LoginFormProps = {
  showRemember?: boolean;
};

export default function LoginForm({ showRemember = false }: LoginFormProps) {
  return (
    <form className="space-y-md" id="loginForm">
      {/* Email */}
      <div className="space-y-xs">
        <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="email">
          Email
        </label>
        <div className="relative">
          <Icon name="mail" className="absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]" />
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="student@academy.edu"
            className="w-full pl-xl pr-md py-2.5 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline/60"
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-xs">
        <div className="flex justify-between items-center">
          <label className="font-label-md text-label-md text-on-surface-variant block" htmlFor="password">
            Password
          </label>
          <a href="#" className="font-label-sm text-label-sm text-primary hover:underline transition-all">
            Forgot Password?
          </a>
        </div>
        <div className="relative">
          <Icon name="lock" className="absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[20px]" />
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full pl-xl pr-xl py-2.5 bg-surface border border-outline-variant rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-outline/60"
          />
          <button
            type="button"
            className="absolute right-sm top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
          >
            <Icon name="visibility" className="text-[20px]" />
          </button>
        </div>
      </div>

      {/* Remember device */}
      {showRemember && (
        <div className="flex items-center space-x-xs">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary"
          />
          <label htmlFor="remember" className="font-label-sm text-label-sm text-on-surface-variant select-none">
            Remember this device
          </label>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-primary text-on-primary py-2.5 rounded-lg font-label-md text-label-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center space-x-xs"
      >
        <span>Login</span>
        <Icon name="arrow_forward" className="text-[18px]" />
      </button>
    </form>
  );
}
