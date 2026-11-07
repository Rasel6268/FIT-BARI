"use client";

import React from "react";
import Link from "next/link";
import { FiChevronRight, FiHome } from "react-icons/fi";

export default function Breadcrumbs({ items = [] }) {
  return (
        <nav aria-label="Breadcrumb" className="py-2.5 mb-4">
          <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[#777D76]">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-[#173F35] transition-colors"
              >
                <FiHome size={12} className="text-[#829B76]" />
                <span>Home</span>
              </Link>
            </li>

            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <React.Fragment key={index}>
                    <li className="text-[#777D76]/50">
                      <FiChevronRight size={12} />
                    </li>
                    <li>
                      {isLast || !item.href ? (
                          <span className="font-semibold text-[#173F35] truncate max-w-xs block">
                            {item.label}
                          </span>
                          ) : (
                          <Link
                            href={item.href}
                            className="hover:text-[#173F35] transition-colors"
                          >
                            {item.label}
                          </Link>
                )}
                        </li>
            </React.Fragment>
                    );
        })}
                  </ol>
                </nav>
              );
            }
