import React from "react";
import { Link } from "react-router-dom";
import { TbUser, TbLogout } from "react-icons/tb";
import { Role } from "@exploresg.frontend/utils";
import type { ProfileMenuItem } from "../../types/navbar";
import Popover from "../Popover";
import { NavbarUser } from "../../layout/Navbar";

export interface ProfileDropdownProps {
  user: NavbarUser;
  menuItems: ProfileMenuItem[];
  onSignOut?: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, menuItems, onSignOut }) => {
  // --- Helper: Format Role ---
  const getFormattedRole = (): string => {
    const roleHierarchy = [Role.ADMIN, Role.FLEET_MANAGER, Role.MANAGER, Role.SUPPORT, Role.USER];
    const foundRole = roleHierarchy.find((r) => user.roles?.includes(r)) || Role.USER;

    return foundRole
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // --- 1. Trigger (Avatar with Fallback) ---
  const Trigger = (
    <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-opacity hover:opacity-80">
      {user.picture ? (
        <img
          src={user.picture}
          alt={user.name}
          className="h-full w-full rounded-full border border-gray-200 object-cover shadow-sm"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-500">
          <TbUser className="text-xl" />
        </div>
      )}
      {/* Online Dot */}
      <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
    </div>
  );

  // --- 2. Content (Menu) ---
  const Content = (
    // FIX: Negative margins (-m-2) to counteract Popover padding
    <div className="-mx-2 -my-2 flex w-60 flex-col overflow-hidden rounded-xl bg-white text-sm">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50/50 px-4 py-3">
        {/* Small Avatar in Header */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400">
          {user.picture ? <img src={user.picture} className="rounded-full" /> : <TbUser />}
        </div>

        <div className="flex flex-col overflow-hidden">
          <span className="truncate font-semibold text-gray-900">{user.name}</span>
          <span className="inline-block w-fit rounded-md bg-green-100 px-1.5 py-0.5 text-[10px] font-semibold text-green-700">
            {getFormattedRole()}
          </span>
        </div>
      </div>

      {/* Links */}
      <div className="p-1">
        {menuItems.map((menuItem, i) => (
          <Link
            key={i}
            to={menuItem.href || "#"}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
          >
            <span className="text-lg text-gray-400">{menuItem.icon}</span>
            <span>{menuItem.label}</span>
          </Link>
        ))}
      </div>

      {/* Sign Out */}
      {onSignOut && (
        <div className="border-t border-gray-100 p-1">
          <button
            onClick={onSignOut}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-red-600 transition-colors hover:bg-red-50"
          >
            <TbLogout className="text-lg" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    // FIX: w-auto allows the Content (w-60) to dictate width
    <Popover trigger={Trigger} className="w-auto">
      {Content}
    </Popover>
  );
};

export default ProfileDropdown;
