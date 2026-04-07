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
            <a href="#results" className="hover:text-foreground transition-colors">
              Results
            </a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">
              Testimonials
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
                className="bg-accent text-background font-bold px-8 py-4 rounded-full text-sm tracking-wide hover:bg-accent-dim transition-all hover:shadow-[0_0_30px_rgba(212,255,0,0.3)]"
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

      {/* ===== STATS BAR ===== */}
      <section className="relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "500+", label: "Clients Transformed" },
            { value: "8+", label: "Years Experience" },
            { value: "98%", label: "Client Retention" },
            { value: "24/7", label: "Support & Guidance" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <span className="text-4xl md:text-5xl font-black text-accent">
                {stat.value}
              </span>
              <span className="text-sm text-muted tracking-wide">
                {stat.label}
              </span>
            </div>
          ))}
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
                      ? "bg-accent text-background hover:bg-accent-dim hover:shadow-[0_0_30px_rgba(212,255,0,0.2)]"
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

      {/* ===== RESULTS / TRANSFORMATIONS ===== */}
      <section id="results" className="py-28 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">
              Results
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-4">
              The proof is in the <span className="gradient-text">progress</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Ahmed M.",
                duration: "12 weeks",
                result: "Lost 18kg & gained visible muscle definition",
                quote:
                  "I tried everything before Captain Shiko. This was the first time something actually worked — and stuck.",
              },
              {
                name: "Sara K.",
                duration: "16 weeks",
                result: "Complete body recomposition & lifestyle change",
                quote:
                  "Not only did my body transform, my entire relationship with food and training changed. Life-changing.",
              },
              {
                name: "Omar H.",
                duration: "8 weeks",
                result: "Gained 6kg lean mass with a structured bulk",
                quote:
                  "The programming was next level. Every detail was planned, and I saw gains I never thought possible.",
              },
            ].map((client) => (
              <div
                key={client.name}
                className="glass rounded-2xl p-8 flex flex-col gap-4 hover-lift"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold">{client.name}</h4>
                    <span className="text-xs text-accent">{client.duration}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm">
                    {client.name.charAt(0)}
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground/90">
                  {client.result}
                </p>
                <p className="text-sm text-muted leading-relaxed flex-1">
                  &ldquo;{client.quote}&rdquo;
                </p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent text-sm">
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS MARQUEE ===== */}
      <section id="testimonials" className="py-16 border-y border-white/5 overflow-hidden">
        <div className="flex gap-8 animate-[slide-in-left_1s_ease-out]">
          {[
            "\"Best investment I ever made for my health.\"",
            "\"Captain Shiko doesn't just train your body, he trains your mind.\"",
            "\"I've never been this consistent in my life.\"",
            "\"Results in 4 weeks that I couldn't get in 2 years alone.\"",
            "\"This isn't coaching. It's a transformation system.\"",
          ].map((quote, i) => (
            <div
              key={i}
              className="shrink-0 glass rounded-full px-8 py-4 text-sm text-muted whitespace-nowrap"
            >
              {quote}
            </div>
          ))}
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
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-background font-bold px-10 py-4 rounded-full text-sm tracking-wide hover:bg-accent-dim transition-all hover:shadow-[0_0_40px_rgba(212,255,0,0.3)]"
            >
              MESSAGE ON WHATSAPP
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/10 text-foreground font-medium px-10 py-4 rounded-full text-sm tracking-wide hover:border-accent/40 hover:text-accent transition-all"
            >
              FOLLOW ON INSTAGRAM
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
            <a href="#results" className="hover:text-foreground transition-colors">
              Results
            </a>
            <a href="#start" className="hover:text-foreground transition-colors">
              Contact
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
