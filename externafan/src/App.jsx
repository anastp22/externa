import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles, LineChart, MessageSquare, Users, Mail, MapPin } from "lucide-react";

// Simple brand tokens
const brand = {
  bg: "bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900",
  card: "bg-slate-900/60 backdrop-blur border border-slate-800",
  text: "text-slate-200",
  accent: "from-fuchsia-500 to-indigo-500",
};

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
    <Sparkles className="h-3.5 w-3.5" /> {children}
  </span>
);

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="py-20 sm:py-28 relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(217,70,239,0.06),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(79,70,229,0.06),transparent_40%)]" />
    <Container>
      <div className="mb-12 max-w-3xl">
        {eyebrow && <Pill>{eyebrow}</Pill>}
        {title && (
          <h2 className={`mt-4 text-3xl sm:text-4xl font-semibold leading-tight ${brand.text}`}>
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-4 text-slate-400 leading-relaxed">{subtitle}</p>
        )}
      </div>
      {children}
    </Container>
  </section>
);

const Card = ({ children, className = "" }) => (
  <div className={`${brand.card} rounded-2xl p-6 shadow-xl ${className}`}>{children}</div>
);

const Feature = ({ icon: Icon, title, desc }) => (
  <Card>
    <div className="flex items-start gap-4">
      <div className="rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-indigo-500/20 p-3"><Icon className="h-6 w-6 text-fuchsia-400" /></div>
      <div>
        <h3 className="text-slate-100 font-medium">{title}</h3>
        <p className="mt-2 text-sm text-slate-400">{desc}</p>
      </div>
    </div>
  </Card>
);

export default function ExternafanSite() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Dev-only smoke tests (run in browser preview)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ids = ["hero", "whyus", "services", "process", "results", "pricing", "faq", "contact"];
    ids.forEach((id) => console.assert(!!document.getElementById(id), `[externafan test] Missing section: ${id}`));

    const form = document.querySelector("#contact form");
    if (form) {
      const name = form.querySelector('input[name="name"]');
      const email = form.querySelector('input[name="email"]');
      console.assert(name?.required, "[externafan test] Name should be required");
      console.assert(email?.type === "email" && email?.required, "[externafan test] Email should be type=email & required");
      const phone = form.querySelector('input[name="phone"]');
      console.assert(!phone, "[externafan test] Phone field should NOT exist");
      const submitBtn = form.querySelector('button[type="submit"]');
      console.assert(submitBtn, "[externafan test] Submit button should exist");
    }

    const footerLeft = document.querySelector("footer .text-slate-400.text-sm");
    const footerRight = document.querySelector("footer .text-xs.text-slate-500");
    console.assert(footerLeft && footerRight, "[externafan test] Footer text blocks should exist");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("https://getform.io/f/aqoevpga", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className={brand.bg}>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/75 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
            <span className="font-semibold tracking-tight text-slate-100">externa<span className="text-fuchsia-400">fan</span></span>
          </a>
          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#process" className="hover:text-white">Process</a>
            <a href="#results" className="hover:text-white">Results</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg">
            Apply now <ArrowRight className="h-4 w-4" />
          </a>
        </Container>
      </header>

      {/* HERO */}
      <Section id="hero" eyebrow="OnlyFans & fan-platform growth" title="Scale your audience & revenue" subtitle="ExternaFan helps creators grow ethically with strategy, messaging, and marketing.">
        <p className="mb-8 text-slate-400 max-w-2xl">We provide professional support for creators who want to take their accounts seriously. Our team combines data-driven marketing, fan engagement, and brand protection to help you grow sustainably without shortcuts or risks.</p>
        <div className="grid gap-6 md:grid-cols-3">
          <Card><h3 className="text-white font-semibold">+43% Avg. uplift</h3><p className="mt-2 text-slate-400 text-sm">Typical revenue increase first month.</p></Card>
          <Card><h3 className="text-white font-semibold">24/7 Coverage</h3><p className="mt-2 text-slate-400 text-sm">Round-the-clock fan messaging.</p></Card>
          <Card><h3 className="text-white font-semibold">3-6x ROAS</h3><p className="mt-2 text-slate-400 text-sm">Return on paid acquisition spend.</p></Card>
        </div>
      </Section>

      {/* WHY US */}
      <Section id="whyus" eyebrow="Why choose us" title="A trusted partner for your creator business" subtitle="Not just managers — growth partners.">
        <div className="grid gap-6 md:grid-cols-2">
          <Card><p className="text-slate-300">✔ Transparent reporting: weekly dashboards with KPIs that matter.</p></Card>
          <Card><p className="text-slate-300">✔ Ethical practices: no catfishing, no undisclosed AI. Fans get authentic engagement.</p></Card>
          <Card><p className="text-slate-300">✔ Dedicated team: strategists, chatters, and media buyers aligned with your goals.</p></Card>
          <Card><p className="text-slate-300">✔ Compliance-first: we ensure platform and legal safety at every step.</p></Card>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" eyebrow="What we do" title="Full-funnel services for creators" subtitle="Strategy, growth, monetization, and brand protection.">
        <p className="mb-8 text-slate-400 max-w-2xl">From designing irresistible offers to managing your daily fan interactions, we provide end-to-end solutions. Our goal is to free up your time while maximizing revenue and protecting your brand.</p>
        <div className="grid gap-6 md:grid-cols-3">
          <Feature icon={LineChart} title="Growth Strategy" desc="Offers, pricing, and funnel optimization." />
          <Feature icon={MessageSquare} title="Fan Messaging" desc="24/7 coverage with scripts and retention." />
          <Feature icon={Users} title="Social Media Engine" desc="Content calendars, collabs, and placements." />
        </div>
      </Section>

      {/* PROCESS */}
      <Section id="process" eyebrow="How we work" title="Our process" subtitle="Clear steps to scale">
        <p className="mb-8 text-slate-400 max-w-2xl">We follow a structured roadmap to ensure predictable growth. Each stage is designed to reduce your workload and steadily increase your monthly earnings.</p>
        <div className="grid gap-6 md:grid-cols-3">
          <Card><h3 className="text-white font-semibold">Audit & Plan</h3><p className="mt-2 text-slate-400 text-sm">Free audit and 90-day roadmap.</p></Card>
          <Card><h3 className="text-white font-semibold">Launch Sprint</h3><p className="mt-2 text-slate-400 text-sm">Setup content, scripts, analytics.</p></Card>
          <Card><h3 className="text-white font-semibold">Scale & Optimize</h3><p className="mt-2 text-slate-400 text-sm">Weekly testing and optimization.</p></Card>
        </div>
      </Section>

      {/* RESULTS */}
      <Section id="results" eyebrow="What you get" title="Results" subtitle="Subscriber growth, PPV uplift, retention">
        <p className="mb-8 text-slate-400 max-w-2xl">Our partners consistently see strong returns when systems are implemented correctly. Below are typical improvements after the first few months of collaboration.</p>
        <div className="grid gap-6 md:grid-cols-3">
          <Card><h3 className="text-white font-semibold">+120% Subs</h3><p className="mt-2 text-slate-400 text-sm">After optimizing offers and bios.</p></Card>
          <Card><h3 className="text-white font-semibold">3.4x PPV</h3><p className="mt-2 text-slate-400 text-sm">Better sequences and clip packaging.</p></Card>
          <Card><h3 className="text-white font-semibold">-28% Churn</h3><p className="mt-2 text-slate-400 text-sm">Win-back automations and offers.</p></Card>
        </div>
      </Section>

      {/* PRICING */}
      <Section id="pricing" eyebrow="Pricing" title="Aligned incentives" subtitle="Choose a starter option">
        <p className="mb-8 text-slate-400 max-w-2xl">We don’t charge upfront retainers. Our model is performance-based: if you win, we win. This ensures aligned incentives and transparent partnerships.</p>
        <div className="grid gap-6 md:grid-cols-3">
          <Card><h3 className="text-white font-semibold">Starter</h3><p className="text-slate-400 text-sm">15% rev-share. Best for smaller creators who need structure and consistent support.</p></Card>
          <Card><h3 className="text-white font-semibold">Growth</h3><p className="text-slate-400 text-sm">25% rev-share. Designed for mid-size creators ready to scale aggressively with ads and team support.</p></Card>
          <Card><h3 className="text-white font-semibold">Elite</h3><p className="text-slate-400 text-sm">Custom. Tailored contracts for high-volume creators or agencies who need enterprise-level management.</p></Card>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" eyebrow="FAQ" title="Questions creators ask">
        <p className="mb-8 text-slate-400 max-w-2xl">We keep things simple and transparent. Here are the most common questions we receive.</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Card><h3 className="text-white font-medium">Who is ExternaFan for?</h3><p className="mt-2 text-sm text-slate-400">Creators on OnlyFans, Fansly, and similar platforms who want a serious partner to grow sustainably.</p></Card>
          <Card><h3 className="text-white font-medium">How do you handle messaging?</h3><p className="mt-2 text-sm text-slate-400">We operate 24/7 coverage with human agents. We disclose assistance when relevant and never pretend to be you.</p></Card>
          <Card><h3 className="text-white font-medium">Can I keep creative control?</h3><p className="mt-2 text-sm text-slate-400">Yes. You approve offers, angles, and boundaries. We bring the system and team, you keep ownership.</p></Card>
          <Card><h3 className="text-white font-medium">How fast can we start?</h3><p className="mt-2 text-sm text-slate-400">Audit within 72 hours, launch sprint the following week. Timelines depend on content readiness.</p></Card>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="Work with us" title="Apply for a free audit">
        <p className="mb-8 text-slate-400 max-w-2xl">Ready to take the next step? Tell us about your profile and goals. Our team will review and get back with a tailored growth plan.</p>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            {submitted ? (
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-white">✅ Thank you!</h3>
                <p className="mt-2 text-slate-300">Your application has been received. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <label className="text-sm text-slate-300">Name</label>
                  <input name="name" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-fuchsia-600" placeholder="Your name" required />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm text-slate-300">Email</label>
                  <input name="email" type="email" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-fuchsia-600" placeholder="you@example.com" required />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm text-slate-300">Links (OnlyFans/Fansly & socials)</label>
                  <input name="links" className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-fuchsia-600" placeholder="https://…" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm text-slate-300">What are your goals in the next 90 days?</label>
                  <textarea name="goals" rows={4} className="rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-fuchsia-600" placeholder="Tell us about targets, constraints, and timeline" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-5 py-3 text-sm font-medium text-white">
                  Request audit <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-xs text-slate-500">By submitting, you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.</p>
              </form>
            )}
          </Card>
          <div className="space-y-4">
            <Card>
              <div className="flex items-center gap-3 text-slate-300"><Mail className="h-5 w-5" /><span>hello@externafan.com</span></div>
            </Card>
            <Card>
              <div className="flex items-center gap-3 text-slate-300"><MapPin className="h-5 w-5" /><span>Remote • Worldwide</span></div>
            </Card>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-10">
        <Container className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-slate-400 text-sm">© {new Date().getFullYear()} ExternaFan. All rights reserved.</div>
          <div className="text-xs text-slate-500">We are independent and not affiliated with OnlyFans®, Fansly®, or Fenix International.</div>
        </Container>
      </footer>
    </div>
  );
}
