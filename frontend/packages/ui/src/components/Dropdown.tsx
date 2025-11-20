import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import React from "react";

export interface DropdownItem {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export interface DropdownProps {
  items: DropdownItem[];
  trigger: React.ReactNode;
  align?: "left" | "right";
}

const Dropdown: React.FC<DropdownProps> = ({ items, trigger, align = "left" }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton>{trigger}</MenuButton>
      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={`absolute ${align === "right" ? "right-0" : "left-0"} z-10 mt-2 w-56 origin-top-${align === "right" ? "right" : "left"} rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none`}
        >
          <div className="px-1 py-1">
            {items.map((item, index) => (
              <MenuItem key={index} disabled={item.disabled}>
                {({ focus }) => (
                  <button
                    onClick={item.onClick}
                    disabled={item.disabled}
                    className={`${
                      focus ? "bg-blue-500 text-white" : "text-gray-900"
                    } ${item.disabled ? "cursor-not-allowed opacity-50" : ""} block w-full px-4 py-2 text-left text-sm`}
                  >
                    {item.label}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
