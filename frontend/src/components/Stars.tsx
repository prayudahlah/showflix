import { useMemo } from "react";

type StarsProps = {
  count: number;
  size: number;
}

function Stars({ count, size }: StarsProps) {
  const stars = useMemo(() =>
    [...Array(count)].map((_, i) => ({
      id: `star-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`,
    }))
    , []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            height: `${size}px`,
            width: `${size}px`,
            left: star.left,
            top: star.top,
            animationDelay: star.delay,
            animationDuration: star.duration,
          }}
        />
      ))}
    </div>
  );
}

export default Stars
