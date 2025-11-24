import React from "react";
import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from "@headlessui/react";

export interface PopoverProps {
  //What do you click to open it? (e.g., The Bell Icon)
  trigger: React.ReactNode;

  // What shows up inside? (e.g., The list of notifications)
  children: React.ReactNode;

  align?: "left" | "right";
}

const Popover: React.FC<PopoverProps> = ({ trigger, children }) => {
  return (
    <HeadlessPopover className="relative">
      <PopoverButton className="text-sm">{trigger}</PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom"
        className="divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
      >
        {children}
      </PopoverPanel>
    </HeadlessPopover>
  );
};

export default Popover;
