import React from "react";
import type { NavLink } from "../../types";
import Popover from "../Popover";
import { TbMenu2 } from "react-icons/tb";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  links: NavLink[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ links }) => {
  const Trigger = (
    <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600">
      <TbMenu2 className="h-6 w-6" />
    </div>
  );

  const Content = (
    <div className="flex flex-col">
      {links.map((link, i) => (
        <Link
          key={i}
          to={link.href || "#"}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100"
        >
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );

  return <Popover trigger={Trigger}>{Content}</Popover>;
};

export default MobileMenu;
