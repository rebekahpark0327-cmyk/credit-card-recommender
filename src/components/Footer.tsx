"use client";

import { motion } from "framer-motion";

const footerLinks = {
  Navigate: [
    { label: "Home", href: "#" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Find Your Card", href: "#form" },
    { label: "Compare Cards", href: "#comparison" },
  ],
  Resources: [
    { label: "Education Hub", href: "#education" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid md:grid-cols-3 gap-12 border-b border-slate-800 pb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-1 rounded">
                <span className="material-symbols-outlined text-white text-xl">
                  payments
                </span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                CC Recommender
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              A free tool to help Canadians find the best credit card for their
              spending habits. Built as a personal project — no ads, no
              sponsorships, no affiliate links.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
                {title}
              </h4>
              <ul className="flex flex-col gap-4 text-sm">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      className="hover:text-primary transition-colors"
                      href={link.href}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-widest font-semibold text-slate-500">
          <span>© {new Date().getFullYear()} CC Recommender</span>
          <a
            href="https://github.com/rebekahpark0327-cmyk/credit-card-recommender"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            View on GitHub
          </a>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
          <p className="text-[10px] md:text-xs text-slate-500 text-center leading-relaxed italic">
            <strong>Disclaimer:</strong> This tool is for informational purposes
            only. Credit card details, rates, and terms may change at any time.
            Always verify the latest information on the issuer&apos;s official
            website before applying. This project is not affiliated with or
            endorsed by any bank or financial institution.
          </p>
        </div>
      </div>
    </footer>
  );
}
