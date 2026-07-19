type FooterProps = {
  offsetLeft?: boolean;
};

export default function Footer({ offsetLeft = false }: FooterProps) {
  return (
    <footer
      className={`bg-surface border-t border-outline-variant flex justify-between items-center py-md px-lg mt-xl ${
        offsetLeft ? 'ml-[280px] w-[calc(100%-280px)]' : ''
      }`}
    >
      <div className="flex flex-col">
        <span className="text-label-md font-label-md font-bold text-on-surface">MultiHolidays</span>
        <p className="text-label-sm font-label-sm text-secondary">© 2024 MultiHolidays. All rights reserved.</p>
      </div>
      <div className="flex items-center gap-lg">
        <a href="#" className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:underline transition-all">
          Terms and Conditions
        </a>
        <a href="#" className="text-label-sm font-label-sm text-on-surface-variant hover:text-on-surface hover:underline transition-all font-bold">
          Meet the Creator: Mukesh G
        </a>
      </div>
    </footer>
  );
}
