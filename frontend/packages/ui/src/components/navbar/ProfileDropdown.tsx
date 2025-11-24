import { NavbarUser } from "../../layout/Navbar";
import { ProfileMenuItem } from "../../types";
import React from "react";
import Popover from "../Popover";
import { Link } from "react-router-dom";

export interface ProfileDropdownProps {
  user: NavbarUser;
  menuItems: ProfileMenuItem[];
}
const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, menuItems }) => {
  const Trigger = (
    <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-100 hover:text-blue-600">
      <img src={user.picture} className="max-h-full max-w-full rounded-full" />
    </div>
  );

  const Content = (
    <div className="flex flex-col items-start justify-center gap-3 space-y-2 text-sm text-gray-600">
      {/* Header */}
      <div className="flex gap-2">
        <img src={user.picture} className="h-10 w-10 rounded-full" />
        <div className="flex flex-col">
          <h1>{user.name}</h1>
          <p className="text-xs text-gray-500">
            {user.roles && user.roles.length > 0
              ? user.roles[0]
                  .replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/\b\w/g, (l) => l.toUpperCase())
              : "User"}
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
    </div>
  );

  return (
    <Popover trigger={Trigger} className="w-40">
      <div>{Content}</div>
    </Popover>
  );
};

export default ProfileDropdown;
