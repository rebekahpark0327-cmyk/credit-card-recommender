"use client";

import { motion } from "framer-motion";

const footerLinks = {
  Company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Card Reviews", href: "#" },
    { label: "Reward Calculator", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Credit Score Guide", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Ad Disclosure", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12"
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
                CardWise Canada
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Helping Canadians navigate the complex world of credit rewards
              since 2018. Independent and transparent.
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
          <span>© 2024 CardWise Canada. All rights reserved.</span>
          <div className="flex gap-8">
            {["Facebook", "Twitter", "LinkedIn"].map((social) => (
              <a key={social} className="hover:text-white transition-colors" href="#">
                {social}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
          <p className="text-[10px] md:text-xs text-slate-500 text-center leading-relaxed italic">
            <strong>Disclaimer:</strong> The information provided on CardWise
            Canada is for informational purposes only. While we strive for
            accuracy, rates and terms change frequently. We may receive
            compensation from partners featured on our site, but our opinions are
            our own and are not influenced by compensation. Always read the terms
            and conditions on the issuer&apos;s website before applying for any
            financial product.
          </p>
        </div>
      </div>
    </footer>
  );
}
