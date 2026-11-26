"use client";

import React from "react";
import { FiCheck } from "react-icons/fi";

const BULLET_REGEX = /^(?:✅|✔|✔️|☑|☑️|•|▪|▸|👉|🔹|🔸|[-*])\s*(.+)$/;
const SECTION_EMOJI_REGEX = /^(✨|🥣|📦|🌿|💪|🔥|⚡|🍯|📌|⭐|🥄|🥛|🎯|🛡️|💚|🌱|🏷️|⚖️)\s*(.+)$/;
const INLINE_EMOJI_SPLIT = /\s+(?=(?:✨|✅|✔|☑|🥣|📦|🌿|💪|🔥|⚡|🍯|📌|👉|🔹|🔸|⭐|🥄|🥛|🎯|🛡️|💚|🌱))/g;

function parseDescriptionBlocks(rawText) {
  if (!rawText || typeof rawText !== "string") return [];

  // Normalize line breaks and ensure emoji markers start on their own lines even if pasted as a single line
  const normalized = rawText
    .replace(/\r\n/g, "\n")
    .replace(INLINE_EMOJI_SPLIT, "\n");

  const rawLines = normalized
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // Expand lines where a section emoji heading and long body share one line (e.g. "🥣 খাওয়ার নিয়ম: প্রতিদিন...")
  const lines = [];
  for (const line of rawLines) {
    const emojiMatch = line.match(SECTION_EMOJI_REGEX);
    if (emojiMatch) {
      const [, emoji, rest] = emojiMatch;
      const colonIdx = rest.indexOf(":");
      if (colonIdx > 0 && colonIdx < 45) {
        const label = rest.slice(0, colonIdx).trim();
        const afterColon = rest.slice(colonIdx + 1).trim();
        if (afterColon.length > 45) {
          lines.push(`${emoji} ${label}:`);
          lines.push(afterColon);
          continue;
        }
      }
    }
    lines.push(line);
  }

  const blocks = [];
  let i = 0;

  // Detect optional top lead title + short tagline (before main body/sections)
  if (lines.length > 1) {
    const first = lines[0];
    const isFirstStructured = BULLET_REGEX.test(first) || SECTION_EMOJI_REGEX.test(first);
    if (!isFirstStructured && first.length <= 110) {
      let tagline = null;
      if (
        lines.length > 2 &&
        !BULLET_REGEX.test(lines[1]) &&
        !SECTION_EMOJI_REGEX.test(lines[1]) &&
        lines[1].length <= 65 &&
        (lines[1].endsWith("!") || lines[1].split(" ").length <= 8)
      ) {
        tagline = lines[1];
        i = 2;
      } else {
        i = 1;
      }
      blocks.push({ type: "lead", title: first, tagline });
    }
  }

  while (i < lines.length) {
    const line = lines[i];

    // 1. Group consecutive bullet items
    if (BULLET_REGEX.test(line)) {
      const items = [];
      while (i < lines.length && BULLET_REGEX.test(lines[i])) {
        const match = lines[i].match(BULLET_REGEX);
        if (match && match[1]) {
          items.push(match[1].trim());
        }
        i++;
      }
      blocks.push({ type: "bullets", items });
      continue;
    }

    // 2. Section emoji lines (either heading or key-value badge)
    const emojiMatch = line.match(SECTION_EMOJI_REGEX);
    if (emojiMatch) {
      const [, emoji, rest] = emojiMatch;
      const colonIdx = rest.indexOf(":");
      if (colonIdx > 0 && colonIdx < rest.length - 1) {
        const label = rest.slice(0, colonIdx).trim();
        const value = rest.slice(colonIdx + 1).trim();
        blocks.push({ type: "keyValue", emoji, label, value });
      } else {
        blocks.push({
          type: "heading",
          emoji,
          text: rest.replace(/:$/, "").trim(),
        });
      }
      i++;
      continue;
    }

    // 3. Plain heading ending with ":" (short line)
    if (line.endsWith(":") && line.length <= 65) {
      blocks.push({
        type: "heading",
        emoji: null,
        text: line.slice(0, -1).trim(),
      });
      i++;
      continue;
    }

    // 4. Closing tagline if it's the very last short line after structured content
    if (i === lines.length - 1 && blocks.length >= 2 && line.length <= 100) {
      blocks.push({ type: "closing", text: line });
      i++;
      continue;
    }

    // 5. Standard paragraph
    blocks.push({ type: "paragraph", text: line });
    i++;
  }

  return blocks;
}

export default function FormattedDescription({ text }) {
  const blocks = parseDescriptionBlocks(text);

  if (blocks.length === 0) {
    return (
      <p className="text-sm text-[#777D76] leading-relaxed">
        No detailed description available for this product yet.
      </p>
    );
  }

  return (
    <div className="space-y-4 font-bengali">
      {blocks.map((block, idx) => {
        if (block.type === "lead") {
          return (
            <div
              key={idx}
              className="border-l-4 border-[#D6A54A] pl-4 py-1 space-y-1 bg-[#F7F5ED]/60 rounded-r-xl pr-4"
            >
              <p className="text-sm sm:text-base font-bold text-[#173F35] leading-snug">
                {block.title}
              </p>
              {block.tagline && (
                <p className="text-xs sm:text-sm font-semibold text-[#829B76] tracking-wide">
                  {block.tagline}
                </p>
              )}
            </div>
          );
        }

        if (block.type === "heading") {
          return (
            <div key={idx} className="pt-2 flex items-center gap-2">
              {block.emoji && (
                <span className="text-base leading-none" aria-hidden="true">
                  {block.emoji}
                </span>
              )}
              <h4 className="text-sm sm:text-base font-bold text-[#173F35] tracking-tight">
                {block.text}
              </h4>
            </div>
          );
        }

        if (block.type === "bullets") {
          return (
            <div
              key={idx}
              className="bg-[#F7F5ED]/75 border border-[#E7E3D8] rounded-2xl p-4 sm:p-5"
            >
              <ul className="space-y-2.5">
                {block.items.map((item, bIdx) => (
                  <li
                    key={bIdx}
                    className="flex items-start gap-2.5 text-sm text-[#252A26] leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#173F35]/10 text-[#173F35] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck size={12} strokeWidth={2.75} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }

        if (block.type === "keyValue") {
          return (
            <div
              key={idx}
              className="inline-flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F7F5ED] border border-[#E7E3D8] text-xs sm:text-sm"
            >
              {block.emoji && <span aria-hidden="true">{block.emoji}</span>}
              <span className="font-semibold text-[#777D76]">{block.label}:</span>
              <span className="font-bold text-[#173F35]">{block.value}</span>
            </div>
          );
        }

        if (block.type === "closing") {
          return (
            <div
              key={idx}
              className="pt-3 border-t border-[#E7E3D8] text-sm font-semibold text-[#173F35] leading-relaxed"
            >
              {block.text}
            </div>
          );
        }

        return (
          <p
            key={idx}
            className="text-sm sm:text-[15px] text-[#3A403B] leading-7 sm:leading-8 whitespace-pre-line"
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
