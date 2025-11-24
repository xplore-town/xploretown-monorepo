import React from "react";
import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from "@headlessui/react";

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
}

const Popover: React.FC<PopoverProps> = ({ trigger, children, align }) => {
  return (
    <HeadlessPopover className="relative">
      <PopoverButton as="div" className="focus:outline-none">
        {trigger}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom end"
        className={`z-50 h-80 w-80 rounded-xl bg-white p-2 shadow-xl transition duration-200 ease-in-out ${align === "right" ? "right-0" : "left-0"}`}
      >
        <div className="overflow-hidden rounded-xl">{children}</div>
      </PopoverPanel>
    </HeadlessPopover>
  );
};

export default Popover;
