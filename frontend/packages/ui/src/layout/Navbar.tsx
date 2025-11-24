import React from "react";
import { Link } from "react-router-dom";
import Logo from "../branding/Logo";
import type { NotificationItem, NavbarUser, ProfileMenuItem, NavLink } from "../types";
import { MobileMenu, NotificationDropdown, ProfileDropdown } from "../components";

export interface NavbarProps {
  // logo: React.ReactNode;
  links: NavLink[];

  isAuthenticated?: boolean;
  user?: NavbarUser | null;

  notifications?: NotificationItem[];
  onViewAllNotifications?: () => void;

  profileMenuItems: ProfileMenuItem[];

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

const Navbar: React.FC<NavbarProps> = ({
  links,
  isAuthenticated,
  user,
  onLogin,
  onLogout,
  notifications = [],
  onViewAllNotifications,
  profileMenuItems,
}) => {
  return (
    <nav className="rounded-b-2xl border-b border-gray-200 bg-white px-6 py-4 text-sm shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex gap-2">
          <MobileMenu links={links} />
          <Logo />
          <Links links={links} />
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <NotificationDropdown
                notifications={notifications}
                onViewAll={onViewAllNotifications}
              />
              <ProfileDropdown user={user} menuItems={profileMenuItems} onSignOut={onLogout} />
            </>
          ) : (
            <button onClick={onLogin}>Login</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
