"use client";

import React from "react";
import Link from "next/link";
import blogPosts from "@/data/blogPosts.json";
import { FiClock, FiArrowRight } from "react-icons/fi";

export default function FitnessNutritionGuide() {
  const [featuredPost, ...otherPosts] = blogPosts;

  return (
        <section id="editorial" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E7E3D8]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#777D76]">
                    NUTRITION RESEARCH & EDUCATION
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-editorial text-[#173F35] tracking-tight">
                    The FIT BARI Journal
                  </h2>
                </div>

              <p className="text-xs sm:text-sm text-[#777D76] max-w-md leading-relaxed">
                Evidence-based nutritional science, ancient harvesting wisdom, and practical fitness fueling guidelines.
              </p>
            </div>

              {/* Magazine Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

                    {/* Main Large Feature (7 cols) */}
                    {featuredPost && (
                      <div className="lg:col-span-7 group bg-[#F7F5ED] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E7E3D8] shadow-subtle hover:shadow-elevate transition-all duration-300 flex flex-col justify-between">
                        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFECE1]">
                          <img
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out editorial-img"
                            loading="lazy"
                          />
                          <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#173F35] text-[#F7F5ED] shadow-sm">
                            {featuredPost.category}
                          </span>
                        </div>

                            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                              <div>
                                <div className="flex items-center gap-3 text-[11px] text-[#777D76] font-medium mb-2">
                                  <span>{featuredPost.date}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <FiClock size={11} />
                                    {featuredPost.readTime}
                                  </span>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-normal font-editorial text-[#173F35] leading-snug group-hover:text-[#829B76] transition-colors">
                                  {featuredPost.title}
                                </h3>

                              <p className="text-xs sm:text-sm text-[#777D76] leading-relaxed mt-2.5">
                                {featuredPost.excerpt}
                              </p>
                            </div>

                        <div className="pt-4 border-t border-[#E7E3D8] flex items-center justify-between text-xs">
                          <span className="text-[11px] font-medium text-[#777D76]">
                            By {featuredPost.author}
                          </span>
                          <span className="font-semibold uppercase tracking-wider text-[#173F35] group-hover:text-[#829B76] inline-flex items-center gap-1 transition-colors">
                            <span>Read Journal Entry</span>
                            <FiArrowRight size={13} />
                          </span>
                        </div>
                      </div>
            </div>
                )}

                      {/* Right 3 Stacked Articles (5 cols) */}
                      <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-5">
                        {otherPosts.map((post) => (
                          <div
                            key={post.id}
                            className="group p-4 sm:p-5 rounded-2xl bg-[#F7F5ED] border border-[#E7E3D8] shadow-subtle hover:border-[#173F35]/40 transition-all flex gap-4"
                          >
                            <div className="w-24 h-24 rounded-xl overflow-hidden relative flex-shrink-0 bg-[#EFECE1]">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 editorial-img"
                                loading="lazy"
                              />
                            </div>

                                <div className="flex-1 min-w-0 flex flex-col justify-between">
                                  <div>
                                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#777D76] mb-1 font-semibold">
                                      <span>{post.category}</span>
                                      <span>•</span>
                                      <span>{post.readTime}</span>
                                    </div>

                                  <h4 className="text-xs sm:text-sm font-semibold text-[#173F35] group-hover:text-[#829B76] transition-colors line-clamp-2 leading-snug">
                                    {post.title}
                                  </h4>
                                </div>

                            <div className="pt-2 flex items-center justify-between text-[11px] text-[#777D76]">
                              <span>{post.author}</span>
                              <span className="font-semibold text-[#173F35] group-hover:text-[#829B76] flex items-center gap-1 transition-colors">
                                <span>Read</span>
                                <FiArrowRight size={11} />
                              </span>
                            </div>
                          </div>
              </div>
            ))}
          </div>

            </div>

      </div>
    </section>
  );
}
