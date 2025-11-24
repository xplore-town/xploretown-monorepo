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
      <PopoverButton className="">{trigger}</PopoverButton>
      <PopoverPanel transition anchor="bottom" className="">
        {children}
      </PopoverPanel>
    </HeadlessPopover>
  );
};

export default Popover;
