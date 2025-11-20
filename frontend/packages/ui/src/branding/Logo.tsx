import logoSrc from "../assets/icon_s.png";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <img src={logoSrc} className="h-8" />
      <h1 className="ml-2 text-2xl font-bold">
        Explore<span className="text-red-500">SG</span>
      </h1>
    </div>
  );
};

export default Logo;
