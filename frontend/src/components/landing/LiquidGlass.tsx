import React from "react";

type LiquidGlassProps = {
  children: React.ReactNode;
  className?: string;
};

const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`
        relative
        flex items-center justify-center gap-2
        px-5 py-4
        rounded-[15px]

        /* PURPLE GLASS BASE */
        bg-[linear-gradient(120deg,
          rgba(86,4,156,0.28),
          rgba(137,24,156,0.18),
          rgba(19,8,48,0.25)
        )]
        backdrop-blur-[14px]

        /* PURPLE EDGE */
        border border-[#56049C]/50

        /* DEPTH + LIQUID FEEL */
        shadow-[
          inset_0_1px_0_rgba(255,255,255,0.35),
          inset_6px_6px_18px_-8px_rgba(200,160,255,0.45),
          inset_-6px_-6px_16px_-6px_rgba(20,0,40,0.45),
          inset_0_0_0_1px_rgba(255,255,255,0.12),
          0_10px_28px_rgba(86,4,156,0.35)
        ]

        ${className}
      `}
    >
      {/* GLASS HIGHLIGHT */}
      <div
        className="
          pointer-events-none
          absolute inset-0
          rounded-[15px]
          bg-[linear-gradient(
            180deg,
            rgba(255,255,255,0.28),
            rgba(255,255,255,0.10)_35%,
            transparent_70%
          )]
          opacity-70
        "
      />

      {/* CONTENT */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default LiquidGlass;
