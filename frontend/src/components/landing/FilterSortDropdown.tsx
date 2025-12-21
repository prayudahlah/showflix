import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface FilterDropdownProps {
  options: string[];
  value: string | number;
  onChange: (value: string) => void;
  width?: string;
}

export default function FilterDropdown({
  options,
  value,
  onChange,
  width = "w-[150px]",
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + window.scrollY, left: rect.left + window.scrollX });
    }
  }, [open]);

  return (
    <div className={`relative ${width} text-white`}>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className="
          w-full h-[35px]
          text-white
          bg-primary2-3
          rounded-[5px]
          px-4
          flex items-center justify-between
          shadow-[0_4px_4px_rgba(0,0,0,0.35)]
          backdrop-blur-sm
          uppercase tracking-widest text-[13px]
        "
      >
        {value}
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open &&
        createPortal(
          <ul
            style={{ top: dropdownPos.top, left: dropdownPos.left }}
            className="absolute z-[9999] w-[161px] bg-[#0B041D] text-white rounded-md shadow-lg overflow-hidden"
          >
            {options.map((opt) => (
              <li
                key={opt}
                className={`px-4 py-2 cursor-pointer hover:bg-[#4b0a85] ${
                  value === opt ? "font-bold text-yellow-400" : "text-white/70"
                }`}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
              >
                {opt}
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
}
