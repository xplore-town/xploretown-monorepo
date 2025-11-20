import React from "react";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <div>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default Button;
