export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight">
            CAPTAIN<span className="text-accent">SHIKO</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted">
            <a href="#about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="#programs" className="hover:text-foreground transition-colors">
              Programs
            </a>
            <a href="#start" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <a
            href="#start"
            className="bg-accent text-background text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-accent-dim transition-colors"
          >
            Start Now
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div className="flex flex-col gap-8">
            <div className="animate-slide-up">
              <span className="inline-block text-accent text-xs font-bold tracking-[0.3em] uppercase mb-6 border border-accent/20 px-4 py-1.5 rounded-full">
                Elite Online Coaching
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight animate-slide-up-delay-1">
              Your body
              <br />
              deserves a{" "}
              <span className="gradient-text">champion&apos;s</span>
              <br />
              discipline.
            </h1>

            <p className="text-lg text-muted max-w-md leading-relaxed animate-slide-up-delay-2">
              Personalized training programs, nutrition guidance, and 1-on-1
              accountability — designed for those who refuse to settle.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up-delay-3">
              <a
                href="#start"
                className="bg-accent text-background font-bold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-accent-dim transition-all hover:shadow-[0_0_30px_rgba(125,211,252,0.3)]"
              >
                BEGIN YOUR TRANSFORMATION
              </a>
              <a
                href="#programs"
                className="border border-white/10 text-foreground font-medium px-8 py-4 rounded-full text-sm tracking-wide hover:border-accent/40 hover:text-accent transition-all"
              >
                View Programs
              </a>
            </div>
          </div>

          {/* Right — Visual element */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative w-[420px] h-[520px]">
              {/* Decorative frame */}
              <div className="absolute inset-0 border border-accent/10 rounded-3xl rotate-3" />
              <div className="absolute inset-0 border border-accent/20 rounded-3xl -rotate-2" />
              <div className="absolute inset-4 bg-surface-light rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="text-center">
                  <div className="text-8xl font-black gradient-text leading-none mb-2">CS</div>
                  <div className="w-16 h-0.5 bg-accent/40 mx-auto mb-3" />
                  <div className="text-xs text-muted tracking-[0.4em] uppercase">
                    Train Different
                  </div>
                </div>
                {/* Corner accents */}
                <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" />
                <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-accent/30 rounded-br-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-muted tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-accent/50 to-transparent" />
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="aspect-[4/5] bg-surface-light rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-surface-light to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full border-2 border-accent/30 flex items-center justify-center mx-auto mb-4">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                      <span className="text-accent text-2xl font-black">CS</span>
                    </div>
                  </div>
                  <p className="text-muted text-sm">Photo placeholder</p>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 glass rounded-2xl px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-accent text-lg">&#9733;</span>
              </div>
              <div>
                <div className="text-sm font-bold">Certified Coach</div>
                <div className="text-xs text-muted">ISSA & NASM</div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-6">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">
              The Coach
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Not just a coach.
              <br />
              <span className="text-muted">A partner in your grind.</span>
            </h2>
            <p className="text-muted leading-relaxed max-w-lg">
              Captain Shiko brings years of elite coaching experience to every
              client. With a science-backed approach to training and nutrition,
              every program is built around your body, your schedule, and your
              goals — no cookie-cutter plans, no excuses.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                "Custom meal plans",
                "Progressive overload",
                "Weekly check-ins",
                "Form corrections",
                "Supplement guidance",
                "Mindset coaching",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section id="programs" className="py-28 bg-surface relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">
              Programs
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-4">
              Choose your <span className="gradient-text">path</span>
            </h2>
            <p className="text-muted mt-4 max-w-md mx-auto">
              Every program is fully customized. Pick your level, and
              let&apos;s build something legendary.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tier: "Starter",
                price: "99",
                desc: "For those beginning their fitness journey",
                features: [
                  "Personalized workout plan",
                  "Basic nutrition guidelines",
                  "Monthly plan updates",
                  "Email support",
                  "Exercise video library",
                ],
                highlighted: false,
              },
              {
                tier: "Pro",
                price: "199",
                desc: "For serious athletes ready to level up",
                features: [
                  "Advanced periodized training",
                  "Custom macro-based meal plan",
                  "Bi-weekly video check-ins",
                  "Direct messaging support",
                  "Form review & corrections",
                  "Supplement protocol",
                ],
                highlighted: true,
              },
              {
                tier: "Elite",
                price: "349",
                desc: "The ultimate 1-on-1 coaching experience",
                features: [
                  "Fully tailored daily programming",
                  "Chef-level meal plans",
                  "Weekly video calls",
                  "24/7 priority support",
                  "Contest / photoshoot prep",
                  "Mindset & lifestyle coaching",
                  "Monthly body composition analysis",
                ],
                highlighted: false,
              },
            ].map((plan) => (
              <div
                key={plan.tier}
                className={`relative rounded-2xl p-8 flex flex-col hover-lift ${
                  plan.highlighted
                    ? "bg-accent/5 border-2 border-accent/30"
                    : "glass"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-background text-xs font-bold px-4 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-1">{plan.tier}</h3>
                  <p className="text-sm text-muted">{plan.desc}</p>
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black">
                    ${plan.price}
                  </span>
                  <span className="text-muted text-sm">/month</span>
                </div>
                <div className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <svg
                        className="w-4 h-4 text-accent mt-0.5 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#start"
                  className={`text-center py-3.5 rounded-full text-sm font-bold tracking-wide transition-all ${
                    plan.highlighted
                      ? "bg-accent text-background hover:bg-accent-dim hover:shadow-[0_0_30px_rgba(125,211,252,0.2)]"
                      : "border border-white/10 text-foreground hover:border-accent/40 hover:text-accent"
                  }`}
                >
                  GET STARTED
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="start" className="py-28 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center flex flex-col items-center gap-8">
          <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">
            Ready?
          </span>
          <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight">
            Your transformation
            <br />
            <span className="gradient-text">starts today.</span>
          </h2>
          <p className="text-muted max-w-md text-lg">
            No more waiting. No more excuses. Take the first step and let&apos;s
            build the best version of you — together.
          </p>
          <a
            href="https://www.instagram.com/shikoahmed88"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-background font-bold px-10 py-4 rounded-full text-sm tracking-wide hover:bg-accent-dim transition-all hover:shadow-[0_0_40px_rgba(125,211,252,0.3)]"
          >
            FOLLOW ON INSTAGRAM
          </a>
          <div className="flex items-center gap-6 mt-4">
            <a
              href="https://www.tiktok.com/@shikoahmed66"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/1CBUcbVnV3/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://youtube.com/@shikoahmed9449?si=uqrXUHQKr7UsbGzo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/shikoahmed88"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm font-bold tracking-tight">
            CAPTAIN<span className="text-accent">SHIKO</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted">
            <a href="#about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="#programs" className="hover:text-foreground transition-colors">
              Programs
            </a>
            <a href="#start" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/shikoahmed88" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@shikoahmed66" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors" aria-label="TikTok">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/1CBUcbVnV3/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://youtube.com/@shikoahmed9449?si=uqrXUHQKr7UsbGzo" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors" aria-label="YouTube">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Captain Shiko. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
