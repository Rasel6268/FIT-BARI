"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { FiCheck, FiArrowRight } from "react-icons/fi";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please provide a valid email address");
      return;
    }

    setIsSubscribed(true);
      toast.success("Thank you for subscribing to the FIT BARI Journal.", {
        style: {
          background: "#173F35",
          color: "#F7F5ED",
          border: "1px solid #D6A54A",
        },
      });
    };

    return (
        <section className="py-20 sm:py-24 bg-[#173F35] text-[#F7F5ED] border-b border-[#0F2B24]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">

            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D6A54A] block">
              THE NOURISHMENT DESK
            </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-white tracking-tight leading-tight">
                  Stay Connected to Real Food.
                </h2>

                  <p className="text-xs sm:text-sm text-[#F7F5ED]/80 max-w-lg mx-auto leading-relaxed">
                    Receive seasonal Sundarban harvest alerts, evidence-based supplementation breakdowns, and quiet reminders on daily nourishment.
                  </p>

                  {isSubscribed ? (
                        <div className="p-6 rounded-2xl bg-white/10 max-w-md mx-auto text-center space-y-2 border border-white/20">
                          <span className="text-xs font-bold text-[#D6A54A] uppercase tracking-wider block">
                            Subscription Confirmed
                          </span>
                          <p className="text-xs text-[#F7F5ED]/80">
                            We have welcomed <strong>{email}</strong> to our quarterly readership list.
                          </p>
                        </div>
                        ) : (
                        <form
                          onSubmit={handleSubmit}
                          className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
                        >
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address..."
                            className="w-full px-5 py-3 text-xs sm:text-sm rounded-full bg-white text-[#252A26] placeholder-[#777D76] outline-none border border-transparent focus:border-[#D6A54A] transition-all"
                          />
                          <button
                            type="submit"
                            className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#D6A54A] hover:bg-[#C2933C] text-[#173F35] text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap shadow-sm"
                          >
                            Subscribe
                          </button>
                        </form>
        )}

                          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#F7F5ED]/60">
                            <FiCheck size={12} className="text-[#829B76]" />
                            <span>Zero spam. Unsubscribe with one click at any time.</span>
                          </div>

                        </div>
                      </section>
                      );
}
