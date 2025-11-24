import { NavbarUser } from "../../layout/Navbar";
import { ProfileMenuItem } from "../../types";
import React from "react";
import Popover from "../Popover";
import { Link } from "react-router-dom";
import { Role } from "@exploresg.frontend/utils";

export interface ProfileDropdownProps {
  user: NavbarUser;
  menuItems: ProfileMenuItem[];
  onSignOut?: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, menuItems, onSignOut }) => {
  // Role hierarchy: ADMIN > FLEET_MANAGER > MANAGER > SUPPORT > USER
  const roleHierarchy = [Role.ADMIN, Role.FLEET_MANAGER, Role.MANAGER, Role.SUPPORT, Role.USER];

  const getHighestRole = (): string => {
    if (!user.roles || user.roles.length === 0) return "User";

    for (const role of roleHierarchy) {
      if (user.roles.includes(role)) {
        return role
          .replace(/_/g, " ")
          .toLowerCase()
          .replace(/\b\w/g, (l) => l.toUpperCase());
      }
    }

    return "User";
  };

  const Trigger = (
    <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600">
      <img src={user.picture} className="max-h-full max-w-full rounded-full" />
    </div>
  );

  const Content = (
    <div className="flex flex-col items-start justify-center gap-3 space-y-2 text-sm text-gray-600">
      {/* Header */}
      <div className="flex gap-2">
        {/* <img src={user.picture} className="h-10 w-10 rounded-full" /> */}
        <div className="flex flex-col">
          <h1>{user.name}</h1>
          <p className="inline-block rounded-2xl bg-green-400 px-2 text-xs text-gray-500">
            {getHighestRole()}
          </p>
        </div>
      </div>

      {/* Links */}
      <div className="">
        {menuItems.map((menuItem, i) => (
          <div
            className="flex w-full cursor-pointer items-center gap-2 border-b border-gray-50 transition-colors last:border-0 hover:bg-gray-50"
            key={i}
          >
            <span>{menuItem.icon}</span>
            <Link to={menuItem.href || "#"}>{menuItem.label}</Link>
          </div>
        ))}
      </div>

      {/* Sign Out Button */}
      {onSignOut && (
        <button
          onClick={onSignOut}
          className="w-full rounded-md bg-red-500/70 px-2 py-1 text-xs font-medium text-white transition-colors hover:bg-red-600"
        >
          Sign Out
        </button>
      )}
    </div>
  );

  return (
    <Popover trigger={Trigger} className="w-40">
      <div>{Content}</div>
    </Popover>
  );
};

export default ProfileDropdown;
