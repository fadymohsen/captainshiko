export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="#" className="text-xl font-extrabold tracking-tight">
            Captain Shiko<span className="text-accent">.</span>
          </a>
          <div className="hidden md:flex items-center gap-10 text-sm text-muted">
            <a href="#about" className="hover:text-foreground transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-foreground transition-colors">
              Services
            </a>
            <a href="#programs" className="hover:text-foreground transition-colors">
              Programs
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
          <a
            href="#contact"
            className="bg-accent text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-accent-light transition-all duration-300"
          >
            Sign Up
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-8 items-center">
          {/* Left — Photo area */}
          <div className="relative flex items-center justify-center">
            {/* Vertical text */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 vertical-text text-[8rem] font-black text-accent/[0.07] leading-none tracking-tight select-none hidden lg:block">
              FITNESS
            </div>
            {/* Photo placeholder */}
            <div className="relative w-full max-w-md aspect-[3/4] bg-surface-light rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-5xl font-black text-white/20">CS</span>
                  </div>
                  <p className="text-muted text-sm">Coach photo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex flex-col gap-8 lg:pl-4">
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] animate-slide-up">
              Shape Your Body
              <br />
              Healthier With
              <br />
              Workouts
            </h1>

            <p className="text-muted max-w-md leading-relaxed animate-slide-up-d1">
              Personalized training programs and nutrition guidance designed to
              transform your body. Expert coaching that delivers real, lasting
              results.
            </p>

            {/* Stats */}
            <div className="flex gap-10 animate-slide-up-d2">
              {[
                { value: "8+", label: "Years Experience" },
                { value: "500+", label: "Clients" },
                { value: "1,000+", label: "Programs" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-extrabold text-accent-light">{stat.value}</div>
                  <div className="text-xs text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Copy */}
          <div className="flex flex-col gap-6">
            <span className="text-sm text-accent-light">About</span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold leading-tight">
              Health Can Be Achieved
              <br />
              With The Right And
              <br />
              Proper Exercise
            </h2>
            <p className="text-muted leading-relaxed max-w-lg">
              Captain Shiko brings a science-backed approach to every training
              program. Whether you&apos;re looking to lose fat, build muscle, or
              completely transform your lifestyle — every plan is custom-built
              for your body, your goals, and your schedule.
            </p>
            <a
              href="#contact"
              className="inline-flex w-fit bg-accent text-white font-bold text-sm px-7 py-3.5 rounded-full hover:bg-accent-light transition-all"
            >
              View Detail
            </a>
          </div>

          {/* Right — Photo grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-surface-light rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-xs text-muted">Strength Training</span>
              </div>
            </div>
            <div className="aspect-[3/4] bg-surface-light rounded-xl overflow-hidden relative mt-8">
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-xs text-muted">Conditioning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES / PROGRAM ===== */}
      <section id="services" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-sm text-accent-light">Service</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">PROGRAM</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { title: "Workout", desc: "Custom training programs tailored to your fitness level and goals." },
              { title: "Nutrition", desc: "Macro-based meal plans designed to fuel performance and recovery." },
              { title: "Coaching", desc: "1-on-1 online coaching with weekly check-ins and accountability." },
              { title: "Lifestyle", desc: "Holistic guidance on sleep, stress management, and habits." },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative aspect-[3/4] bg-surface-light rounded-xl overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-lg font-bold mb-2 group-hover:translate-y-0 translate-y-1 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.desc}
                  </p>
                </div>
                {/* Hover border */}
                <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-accent/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COACH ===== */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-sm text-accent-light">Team</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">COACH</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group">
              <div className="aspect-[3/4] bg-surface-light rounded-xl overflow-hidden relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <span className="text-3xl font-black text-white/20">CS</span>
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-lg">Captain Shiko</h3>
              <p className="text-sm text-muted">Head Coach & Founder</p>
            </div>

            <div className="group">
              <div className="aspect-[3/4] bg-surface-light rounded-xl overflow-hidden relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted text-sm">Photo placeholder</span>
                </div>
              </div>
              <h3 className="font-bold text-lg">Strength Coach</h3>
              <p className="text-sm text-muted">Resistance Training Specialist</p>
            </div>

            <div className="group">
              <div className="aspect-[3/4] bg-surface-light rounded-xl overflow-hidden relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-muted text-sm">Photo placeholder</span>
                </div>
              </div>
              <h3 className="font-bold text-lg">Nutrition Coach</h3>
              <p className="text-sm text-muted">Diet & Supplementation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="programs" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <span className="text-sm text-accent-light">Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">BUNDLING</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl">
            {[
              {
                tier: "Basic",
                price: "$80",
                period: "/month",
                features: [
                  "Personalized workout plan",
                  "Basic nutrition guidelines",
                  "Monthly plan updates",
                  "Email support",
                ],
                highlighted: false,
              },
              {
                tier: "Gold",
                price: "$150",
                period: "/month",
                features: [
                  "Advanced periodized training",
                  "Custom macro-based meal plan",
                  "Bi-weekly video check-ins",
                  "Direct messaging support",
                  "Form review & corrections",
                ],
                highlighted: true,
              },
              {
                tier: "Platinum",
                price: "$250",
                period: "/month",
                features: [
                  "Fully tailored daily programming",
                  "Chef-level meal plans",
                  "Weekly video calls",
                  "24/7 priority support",
                  "Contest / photoshoot prep",
                  "Mindset & lifestyle coaching",
                ],
                highlighted: false,
              },
            ].map((plan) => (
              <div
                key={plan.tier}
                className={`rounded-xl p-8 flex flex-col transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-accent text-white border border-accent"
                    : "bg-surface-light border border-border hover:border-accent/30"
                }`}
              >
                <div className="mb-6">
                  <h3 className={`text-sm font-semibold mb-4 ${plan.highlighted ? "text-white/70" : "text-muted"}`}>
                    {plan.tier}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className={`text-sm ${plan.highlighted ? "text-white/60" : "text-muted"}`}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                <div className="w-full h-px bg-current opacity-10 mb-6" />

                <div className="flex flex-col gap-3.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${plan.highlighted ? "bg-white" : "bg-accent-light"}`} />
                      <span className={`text-sm ${plan.highlighted ? "text-white/80" : "text-muted"}`}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className={`text-center py-3.5 rounded-full text-sm font-bold transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-white text-accent font-bold hover:bg-white/90"
                      : "border border-accent/30 text-foreground hover:bg-accent/10"
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER / CTA ===== */}
      <section id="contact" className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-surface-light rounded-2xl p-10 sm:p-16 flex flex-col lg:flex-row items-center gap-12 border border-border">
            <div className="flex-1">
              <span className="text-sm text-accent-light">Newsletter</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-4">
                Ready To Transform?
              </h2>
              <p className="text-muted max-w-md leading-relaxed">
                Follow Captain Shiko on social media for daily tips, workout
                motivation, and client transformations.
              </p>
            </div>
            <div className="flex flex-col gap-4 items-center lg:items-end">
              <div className="flex items-center gap-6">
                <a
                  href="https://www.instagram.com/shikoahmed88"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent-light transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a
                  href="https://www.tiktok.com/@shikoahmed66"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent-light transition-colors"
                  aria-label="TikTok"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/></svg>
                </a>
                <a
                  href="https://www.facebook.com/share/1CBUcbVnV3/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent-light transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a
                  href="https://youtube.com/@shikoahmed9449?si=uqrXUHQKr7UsbGzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-accent-light transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
              <a
                href="https://www.instagram.com/shikoahmed88"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white font-bold text-sm px-8 py-3.5 rounded-full hover:bg-accent-light transition-all"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-lg font-extrabold tracking-tight">
            Captain Shiko<span className="text-accent">.</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted">
            <a href="#about" className="hover:text-accent-light transition-colors">About</a>
            <a href="#services" className="hover:text-accent-light transition-colors">Services</a>
            <a href="#programs" className="hover:text-accent-light transition-colors">Programs</a>
            <a href="#contact" className="hover:text-accent-light transition-colors">Contact</a>
          </div>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Captain Shiko
          </p>
        </div>
      </footer>
    </div>
  );
}
