import React from "react";
import { Link } from "react-router-dom";
import Logo from "../branding/Logo";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarUser {
  name: string;
  email: string;
  picture?: string;
}

export interface NavbarProps {
  // logo: React.ReactNode;
  links: NavLink[];

  isAuthenticated?: boolean;
  user?: NavbarUser | null;

  // Add Callback for Actions
  onLogin?: () => void;
  onLogout?: () => void;
}

const Links: React.FC<{ links: NavLink[] }> = ({ links }) => {
  return (
    <div className="ml-4 flex items-center gap-2">
      {links.map((link, id) => (
        <Link key={id} to={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};

// const SignIn: React.FC = () => {
//   return <Link to={"/signin"}>Signin</Link>;
// };

const Navbar: React.FC<NavbarProps> = ({ links, isAuthenticated, user, onLogin, onLogout }) => {
  return (
    <nav className="rounded-b-2xl border-b border-gray-200 bg-white px-6 py-4 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex gap-2">
          <Logo />
          <Links links={links} />
        </div>

        <div className="flex">
          {isAuthenticated ? (
            <button onClick={onLogout}>Logout</button>
          ) : (
            <button onClick={onLogin}>Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
