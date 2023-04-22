import React, { CSSProperties, ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children?: ReactNode;
  type?: "primary" | "secondary" | "transparent" | "accent";
  onClick?: (e: any) => void;
  size?: "small" | "medium" | "large" | "default";
  style?: CSSProperties;
  url?: string;
  disabled?: boolean;
  buttonType?: "button" | "submit" | "reset";
  name?: string;
  iconOnly?: boolean;
  tooltip?: string;
  className?: string;
}

function Button(props: ButtonProps) {
  const {
    children,
    type,
    onClick,
    size,
    style,
    disabled,
    buttonType,
    name,
    iconOnly,
    tooltip,
    className,
  } = props;

  return (
    <button
      className={[
        styles.button,
        styles[type || "primary"],
        styles[size || "default"],
        iconOnly && styles["icon-only"],
        disabled && styles.disabled,
        className,
      ].join(" ")}
      onClick={onClick}
      name={name}
      style={style}
      type={buttonType || "button"}
      disabled={disabled}
      title={tooltip}
    >
      {children}
    </button>
  );
}

export default Button;
