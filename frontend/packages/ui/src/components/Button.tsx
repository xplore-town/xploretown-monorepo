import React from "react";
import type { BaseComponentProps, VoidCallback } from "../types";

export interface ButtonProps extends BaseComponentProps {
  label: string;
  onClick?: VoidCallback;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="rounded bg-red-400 p-4 font-bold">
      {label}
    </button>
  );
};

export default Button;
