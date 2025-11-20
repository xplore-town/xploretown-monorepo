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
    <div className="flex gap-2">
      {links.map((link, id) => (
        <Link key={id} to={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};

const SignIn: React.FC = () => {
  return <Link to={"/signin"}>Signin</Link>;
};

const Navbar: React.FC<NavbarProps> = ({ logo, links }) => {
  return (
    <nav className="border-b border-gray-200 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl justify-between bg-red-300">
        <div className="flex gap-2">
          <Logo logo={logo} />
          <Links links={links} />
        </div>
        <div className="flex">
          <SignIn />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
