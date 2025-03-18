import React from "react";

// Constants for styling
const SECTION_TITLE_STYLES =
  "relative w-fit mt-[-1.00px] font-titles font-[number:var(--titles-font-weight)] text-[length:var(--titles-font-size)] tracking-[var(--titles-letter-spacing)] leading-[var(--titles-line-height)] whitespace-nowrap [font-style:var(--titles-font-style)]";
const COUNT_STYLES =
  "relative w-fit mt-[-1.00px] font-titles font-[number:var(--titles-font-weight)] text-app-primary text-[length:var(--titles-font-size)] tracking-[var(--titles-letter-spacing)] leading-[var(--titles-line-height)] whitespace-nowrap [font-style:var(--titles-font-style)]";

/**
 * Task section header with title, count, and optional right element
 */
interface TaskSectionProps {
  title: string;
  count: number;
  isDarkMode: boolean;
  rightElement?: React.ReactNode;
}

export const TaskSection = ({
  title,
  count,
  isDarkMode,
  rightElement,
}: TaskSectionProps) => (
  <section className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
    <div className="justify-center inline-flex items-center gap-2.5 relative flex-[0_0_auto]">
      <h2
        className={`${SECTION_TITLE_STYLES} ${
          isDarkMode ? "text-foreground-dark" : "text-foreground-light"
        }`}
      >
        {title}
      </h2>
      <span className={COUNT_STYLES}>{count}</span>
    </div>

    {rightElement}
  </section>
);
