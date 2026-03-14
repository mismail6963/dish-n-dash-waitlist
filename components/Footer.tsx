'use client';

const NAV_LINKS = [
  { label: 'About', href: '#what' },
  { label: 'How It Works', href: '#how' },
  { label: 'Founders Club', href: '#waitlist' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-bg-primary">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <h3 className="text-lg font-bold tracking-tight text-text-primary">
              Dish N Dash
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">
              Dining, intelligently organized. A premium dining-tech platform born in Saudi Arabia.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex gap-8" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-emerald-bright transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-white/[0.04] pt-8">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Dish N Dash. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-xs text-text-muted hover:text-text-secondary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
