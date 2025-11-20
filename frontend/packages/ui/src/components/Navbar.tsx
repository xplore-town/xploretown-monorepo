import React from "react";
import { Link } from "react-router-dom";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  logo: React.ReactNode;
  links: NavLink[];
}

const Logo: React.FC<{ logo: React.ReactNode }> = ({ logo }) => {
  return <div>{logo}</div>;
};

const Links: React.FC<{ links: NavLink[] }> = ({ links }) => {
  return (
    <div>
      {links.map((link) => (
        <Link to={link.href}>{link.label}</Link>
      ))}
    </div>
  );
};

const Navbar: React.FC<NavbarProps> = ({ logo, links }) => {
  return (
    <nav className="border-b border-gray-200 bg-white shadow-md">
      <div className="mx-auto max-w-7xl bg-red-300">
        <Logo logo={logo} />
        <Links links={links} />
      </div>
    </nav>
  );
};

export default Navbar;
