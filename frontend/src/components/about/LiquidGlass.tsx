import React from "react";

type LiquidGlassProps = {
  children?: React.ReactNode;
  width?: number | string;
  height?: number | string;
};

const LiquidGlass: React.FC<LiquidGlassProps> = ({
  children,
  width = "1120px",
  height = "520.36px",
}) => {
  return (
    <div style={{ ...styles.container, width, height }}>
      {children}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "8px 12px",
    gap: "8px",

    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(34px)",
    WebkitBackdropFilter: "blur(34px)",

    borderRadius: "15px",

    boxShadow: `
      inset 7px 7px 21px -8px rgba(255, 255, 255, 0.3),
      inset 4.6px 4.6px 2.3px -4.6px rgba(179, 179, 179, 0.3),
      inset -4.6px -4.6px 12px -4.6px rgba(179, 179, 179, 0.3),
      inset 0 0 0 1px rgba(153, 153, 153, 0.5),
      inset 0 0 51px rgba(242, 242, 242, 0.5)
    `,
  },
};

export default LiquidGlass;