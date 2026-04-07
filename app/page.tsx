export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="text-2xl font-extrabold tracking-tight">
            CAPTAIN<span className="text-accent">SHIKO</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted uppercase tracking-wider">
            <a href="#about" className="hover:text-accent transition-colors duration-300">
              About
            </a>
            <a href="#services" className="hover:text-accent transition-colors duration-300">
              Services
            </a>
            <a href="#programs" className="hover:text-accent transition-colors duration-300">
              Programs
            </a>
            <a href="#start" className="hover:text-accent transition-colors duration-300">
              Contact
            </a>
          </div>
          <a
            href="#start"
            className="bg-cta text-background text-sm font-bold px-6 py-2.5 rounded-3xl hover:bg-cta-dim transition-all duration-300 shadow-[0_4px_10px_rgba(84,214,44,0.3)]"
          >
            Start Now
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center hero-gradient pt-20">
        {/* Ambient circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-accent/10 blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-[15%] left-[5%] w-[250px] h-[250px] rounded-full bg-accent/5 blur-[80px] animate-pulse-glow" />
          <div className="absolute top-[60%] right-[30%] w-[180px] h-[180px] rounded-full border-2 border-accent/10" />
          <div className="absolute top-[25%] right-[20%] w-[280px] h-[280px] rounded-full border border-accent/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <div className="flex flex-col gap-8">
            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 text-accent text-xs font-bold tracking-[0.25em] uppercase border border-accent/20 px-5 py-2 rounded-full">
                <span className="w-2 h-2 rounded-full bg-cta animate-pulse" />
                Elite Online Coaching
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-[4rem] font-black leading-[1.08] tracking-tight animate-slide-up-delay-1">
              Transform Your Body.
              <br />
              <span className="gradient-text">Transform Your Life.</span>
            </h1>

            <p className="text-lg text-muted max-w-lg leading-relaxed animate-slide-up-delay-2">
              Science-backed training programs, personalized nutrition, and dedicated 1-on-1 coaching — built for real results that last.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up-delay-3">
              <a
                href="#start"
                className="bg-cta text-background font-bold px-8 py-4 rounded-3xl text-sm tracking-wide hover:bg-cta-dim transition-all duration-300 shadow-[0_4px_14px_rgba(84,214,44,0.35)] hover:shadow-[0_6px_24px_rgba(84,214,44,0.5)]"
              >
                START YOUR JOURNEY
              </a>
              <a
                href="#programs"
                className="border border-accent/40 text-accent font-semibold px-8 py-4 rounded-3xl text-sm tracking-wide hover:bg-accent/10 transition-all duration-300"
              >
                View Programs
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 animate-slide-up-delay-3">
              <div className="flex -space-x-3">
                {["A", "S", "M", "K"].map((letter, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-surface-light border-2 border-accent/40 flex items-center justify-center text-xs font-bold text-accent"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <span className="text-sm font-bold text-foreground">+500</span>
                <span className="text-sm text-muted ml-1">transformations</span>
              </div>
            </div>
          </div>

          {/* Right — Decorative */}
          <div className="hidden lg:flex items-center justify-center relative">
            <div className="relative">
              {/* Outer ring */}
              <div className="w-[400px] h-[400px] rounded-full border border-accent/15 flex items-center justify-center">
                {/* Inner ring */}
                <div className="w-[320px] h-[320px] rounded-full border border-accent/10 flex items-center justify-center bg-accent/[0.02]">
                  {/* Core */}
                  <div className="w-[220px] h-[220px] rounded-full bg-gradient-to-br from-navy to-surface-light flex items-center justify-center border border-accent/20 shadow-[0_0_60px_rgba(124,202,207,0.1)]">
                    <div className="text-center">
                      <div className="text-6xl font-black gradient-text leading-none">CS</div>
                      <div className="w-12 h-0.5 bg-accent/40 mx-auto my-3" />
                      <div className="text-[10px] text-muted tracking-[0.4em] uppercase font-semibold">
                        Train Different
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute top-4 -right-4 glass-card px-4 py-2.5 flex items-center gap-2 animate-float">
                <div className="w-8 h-8 rounded-full bg-cta/20 flex items-center justify-center">
                  <span className="text-cta text-sm">&#10003;</span>
                </div>
                <span className="text-xs font-bold">Certified Coach</span>
              </div>
              <div className="absolute -bottom-2 -left-8 glass-card px-4 py-2.5 flex items-center gap-2 animate-float" style={{ animationDelay: "2s" }}>
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-sm">&#9733;</span>
                </div>
                <span className="text-xs font-bold">ISSA & NASM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-6 h-10 rounded-full border border-accent/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 rounded-full bg-accent/60 animate-float" />
          </div>
        </div>
      </section>

      {/* ===== SCROLLING BANNER ===== */}
      <section className="py-5 bg-foreground -rotate-1 scale-105 overflow-hidden">
        <div className="flex animate-scroll-left whitespace-nowrap">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex shrink-0">
              {[
                "PERSONAL TRAINING",
                "NUTRITION PLANS",
                "BODY TRANSFORMATION",
                "ONLINE COACHING",
                "LIFESTYLE CHANGE",
                "MUSCLE BUILDING",
                "FAT LOSS",
                "MINDSET",
              ].map((text, i) => (
                <span key={i} className="text-background text-sm font-extrabold tracking-[0.2em] uppercase mx-8">
                  {text} <span className="text-cta mx-4">&#9679;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-28 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[150px]" />
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative">
            <div className="aspect-[4/5] bg-surface rounded-[20px] overflow-hidden relative border border-border">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-navy/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-28 h-28 rounded-full border-2 border-accent/30 flex items-center justify-center mx-auto mb-4 bg-accent/5">
                    <span className="text-accent text-4xl font-black">CS</span>
                  </div>
                  <p className="text-muted text-sm">Coach photo</p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-surface to-transparent" />
            </div>
            {/* Floating stat */}
            <div className="absolute -bottom-5 -right-5 glass-card px-6 py-4 flex items-center gap-4">
              <div className="text-3xl font-black text-accent">8+</div>
              <div>
                <div className="text-sm font-bold">Years</div>
                <div className="text-xs text-muted">Experience</div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="flex flex-col gap-6">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">
              About the Coach
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              Not just a coach.
              <br />
              <span className="text-muted">A partner in your grind.</span>
            </h2>
            <p className="text-muted leading-relaxed max-w-lg text-[1.05rem]">
              Captain Shiko brings years of elite coaching experience to every client. With a science-backed approach to training and nutrition, every program is built around your body, your schedule, and your goals — no cookie-cutter plans, no excuses.
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-2">
              {[
                "Custom meal plans",
                "Progressive overload",
                "Weekly check-ins",
                "Form corrections",
                "Supplement guidance",
                "Mindset coaching",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-cta/15 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-foreground/80 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-28 bg-surface relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">
              What We Offer
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted mt-4 max-w-lg mx-auto">
              Comprehensive fitness solutions tailored to your unique needs and goals.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                title: "Personal Training",
                desc: "Customized workout programs designed for your specific goals and fitness level.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.379a48.474 48.474 0 00-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
                  </svg>
                ),
                title: "Nutrition Plans",
                desc: "Macro-based meal plans crafted to fuel your workouts and optimize recovery.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                ),
                title: "1-on-1 Coaching",
                desc: "Direct access, weekly check-ins, form corrections, and full accountability.",
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                ),
                title: "Body Transformation",
                desc: "Complete programs designed for dramatic, lasting physique changes.",
              },
            ].map((service) => (
              <div
                key={service.title}
                className="glass-card p-8 flex flex-col gap-4 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold">{service.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS / PRICING ===== */}
      <section id="programs" className="py-28 relative">
        <div className="absolute top-[20%] right-0 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">
              Programs
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-4">
              Choose Your <span className="gradient-text">Path</span>
            </h2>
            <p className="text-muted mt-4 max-w-md mx-auto">
              Every program is fully customized. Pick your level, and let&apos;s build something legendary.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                ],
                highlighted: false,
              },
            ].map((plan) => (
              <div
                key={plan.tier}
                className={`relative rounded-[20px] p-8 flex flex-col transition-all duration-300 ${
                  plan.highlighted
                    ? "bg-surface border-2 border-accent/40 shadow-[0_0_40px_rgba(124,202,207,0.08)] scale-[1.03]"
                    : "bg-surface border border-border hover:border-accent/20"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-background text-xs font-extrabold px-5 py-1.5 rounded-full tracking-wide">
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-1">{plan.tier}</h3>
                  <p className="text-sm text-muted">{plan.desc}</p>
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-black text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-muted text-sm font-medium">/month</span>
                </div>
                <div className="flex flex-col gap-3.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-cta/15 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-cta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-foreground/80">{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  href="#start"
                  className={`text-center py-3.5 rounded-3xl text-sm font-bold tracking-wide transition-all duration-300 ${
                    plan.highlighted
                      ? "bg-cta text-background hover:bg-cta-dim shadow-[0_4px_14px_rgba(84,214,44,0.3)]"
                      : "border border-accent/30 text-accent hover:bg-accent/10"
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
      <section id="start" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
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
            No more waiting. No more excuses. Take the first step and let&apos;s build the best version of you — together.
          </p>
          <a
            href="https://www.instagram.com/shikoahmed88"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-cta text-background font-bold px-10 py-4 rounded-3xl text-sm tracking-wide hover:bg-cta-dim transition-all duration-300 shadow-[0_4px_14px_rgba(84,214,44,0.35)] hover:shadow-[0_6px_24px_rgba(84,214,44,0.5)]"
          >
            GET IN TOUCH
          </a>
          <div className="flex items-center gap-6 mt-2">
            <a
              href="https://www.instagram.com/shikoahmed88"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-300"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a
              href="https://www.tiktok.com/@shikoahmed66"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-300"
              aria-label="TikTok"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/></svg>
            </a>
            <a
              href="https://www.facebook.com/share/1CBUcbVnV3/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-300"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="https://youtube.com/@shikoahmed9449?si=uqrXUHQKr7UsbGzo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent transition-colors duration-300"
              aria-label="YouTube"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-xl font-extrabold tracking-tight">
            CAPTAIN<span className="text-accent">SHIKO</span>
          </div>
          <div className="flex items-center gap-8 text-sm text-muted font-semibold uppercase tracking-wider">
            <a href="#about" className="hover:text-accent transition-colors duration-300">
              About
            </a>
            <a href="#services" className="hover:text-accent transition-colors duration-300">
              Services
            </a>
            <a href="#programs" className="hover:text-accent transition-colors duration-300">
              Programs
            </a>
            <a href="#start" className="hover:text-accent transition-colors duration-300">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/shikoahmed88" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors duration-300" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@shikoahmed66" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors duration-300" aria-label="TikTok">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/></svg>
            </a>
            <a href="https://www.facebook.com/share/1CBUcbVnV3/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors duration-300" aria-label="Facebook">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://youtube.com/@shikoahmed9449?si=uqrXUHQKr7UsbGzo" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors duration-300" aria-label="YouTube">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted text-center">
            &copy; {new Date().getFullYear()} Captain Shiko. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
