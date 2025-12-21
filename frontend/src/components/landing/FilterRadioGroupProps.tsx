interface FilterRadioGroupProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  direction?: "row" | "col";
  columns?: 2;
}

export default function FilterRadioGroup({
  label,
  options,
  value,
  onChange,
  direction = "row",
  columns,
}: FilterRadioGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-white uppercase text-[12px] tracking-widest">
        {label}
      </span>

      <div
        className={
          columns === 2
            ? "grid grid-cols-2 gap-2"
            : direction === "col"
            ? "flex flex-col gap-2"
            : "flex flex-row gap-2"
        }
      >
        {options.map((opt) => (
          <label
            key={opt}
            className={`
              h-[25px]
              flex items-center justify-center
              px-1 rounded-[5px] cursor-pointer
              text-[13px] uppercase tracking-wide
              transition-all
              ${
                value === opt
                  ? "bg-purple-700 text-yellow-400 font-semibold"
                  : "bg-primary2-3 text-white/70 hover:bg-primary2-4"
              }
            `}
          >
            <input
              type="radio"
              className="hidden"
              checked={value === opt}
              onChange={() => onChange(opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
