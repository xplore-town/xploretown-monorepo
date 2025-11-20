import logoSrc from "../assets/icon_s.png";
import React from "react";

export interface LogoProps {
  specialBanner?: string;
}

const Logo: React.FC<LogoProps> = ({ specialBanner }) => {
  return (
    <div className="flex items-center">
      <img src={logoSrc} className="h-8" />
      <h1 className="ml-2 text-2xl font-bold">
        Explore<span className="text-red-500">SG</span>
      </h1>

      {specialBanner && <span>{specialBanner}</span>}
    </div>
  );
};

export default Logo;
