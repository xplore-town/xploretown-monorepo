import React from "react";
import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from "@headlessui/react";

export interface PopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

const Popover: React.FC<PopoverProps> = ({ trigger, children, align, className = "w-80" }) => {
  return (
    <HeadlessPopover className="relative">
      <PopoverButton as="div" className="focus:outline-none">
        {trigger}
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom end"
        className={`z-50 mt-2 h-80 w-80 rounded-xl ${className} bg-white p-2 shadow-xl transition duration-200 ease-in-out data-closed:-translate-y-2 data-closed:opacity-0 ${align === "right" ? "origin-top-right" : "origin-top-left"}`}
      >
        <div className="overflow-hidden rounded-xl">{children}</div>
      </PopoverPanel>
    </HeadlessPopover>
  );
};

export default Popover;
