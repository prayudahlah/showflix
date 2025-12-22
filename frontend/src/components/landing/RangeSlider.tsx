import { useState } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  initialMin: number;
  initialMax: number;
  onChange?: (range: { min: number; max: number }) => void;
}

export default function RangeSlider({
  min,
  max,
  step = 1,
  initialMin,
  initialMax,
  onChange,
}: RangeSliderProps) {
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMinChange = (value: number) => {
    const newMin = Math.min(value, maxValue - step);
    setMinValue(newMin);
    onChange?.({ min: newMin, max: maxValue });
  };

  const handleMaxChange = (value: number) => {
    const newMax = Math.max(value, minValue + step);
    setMaxValue(newMax);
    onChange?.({ min: minValue, max: newMax });
  };

  const rangePercent = (value: number) =>
    ((value - min) / (max - min)) * 100;

  return (
    <div className="w-[300px] relative py-2">
      <div className="absolute top-1/2 -translate-y-1/2 h-px w-full bg-gray-600 rounded" />

      {/* Active Range */}
      <div
        className="absolute top-1/2 -translate-y-1/2 h-0.5 bg-secondary-2 rounded"
        style={{
          left: `${rangePercent(minValue)}%`,
          width: `${rangePercent(maxValue) - rangePercent(minValue)}%`,
        }}
      />

      {/* Min Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={(e) => handleMinChange(Number(e.target.value))}
        className="range-slider"
      />

      {/* Max Slider */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxValue}
        onChange={(e) => handleMaxChange(Number(e.target.value))}
        className="range-slider"
      />

      {/* Labels */}
      <div className="flex justify-between text-sm text-white mt-4">
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </div>
  );
}

