"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";

const testimonials = [
  {
    quote:
      "Honestly I was skeptical — we tried a couple of chatbot things before and they were useless. This is different. The calls actually get handled properly, and my manager stopped dreading the dinner rush. We're not losing bookings the way we used to.",
    name: "Rajeev Malhotra",
    role: "Owner",
    restaurant: "Spice Route Kitchen, Delhi",
    type: "QSR",
  },
  {
    quote:
      "What surprised me was how natural it sounds. One of our regulars called to book and didn't even realise she wasn't speaking to our hostess. She mentioned it when she came in — said the service was 'very smooth.' That's the bar we hold ourselves to.",
    name: "Ananya Krishnan",
    role: "Operations Head",
    restaurant: "Oleander, Bangalore",
    type: "Fine Dining",
  },
  {
    quote:
      "We have three outlets and managing inbound calls across all of them was a mess. Different staff, different standards. Now it's consistent everywhere. And the bookings show up in the system without anyone having to type anything in.",
    name: "Farrukh Siddiqui",
    role: "F&B Director",
    restaurant: "The Siddiqui Group, Mumbai",
    type: "Multi-outlet",
  },
  {
    quote:
      "I run a small place, 40 covers. Didn't think something like this was for us — felt like enterprise software. The setup was fast, the price made sense, and it genuinely handles the calls. My one staff member on the floor can actually focus on the guests sitting in front of her.",
    name: "Shruti Deshpande",
    role: "Owner",
    restaurant: "Kona Café, Pune",
    type: "Café",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-slate-50" id="testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeIn className="max-w-xl mb-16">
          <h2
            className="text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-sora)" }}
          >
            Restaurants that{" "}
            <span className="gradient-text">stopped missing calls.</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.09}>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 20px 50px -10px rgba(37,99,235,0.12)" }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 h-full flex flex-col cursor-default"
              >
                {/* Type badge */}
                <span className="self-start text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-5">
                  {t.type}
                </span>

                {/* Quote */}
                <blockquote className="text-slate-700 text-sm leading-relaxed flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                    style={{ fontFamily: "var(--font-sora)" }}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {t.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {t.role} · {t.restaurant}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
