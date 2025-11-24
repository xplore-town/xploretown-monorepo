import { NavbarUser } from "@ui/layout/Navbar";
import { ProfileMenuItem } from "@ui/types";
import React from "react";
import Popover from "../Popover";
import { Link } from "react-router-dom";

export interface ProfileDropdownProps {
  user: NavbarUser;
  menuItems: ProfileMenuItem[];
}
const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, menuItems }) => {
  const Trigger = (
    <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600">
      <img src={user.picture} className="max-h-full max-w-full rounded-full" />
    </div>
  );

  const Content = (
    <div className="flex w-60 flex-col bg-red-400 text-sm text-gray-700">
      {menuItems.map((menuItem, i) => (
        <div className="flex items-center" key={i}>
          <span>{menuItem.icon}</span>
          <Link to={menuItem.href || "#"}>{menuItem.label}</Link>
        </div>
      ))}
    </div>
  );

  return (
    <Popover trigger={Trigger}>
      <div>{Content}</div>
    </Popover>
  );
};

export default ProfileDropdown;
