import React from "react";
import { Popover as HeadlessPopover, PopoverButton, PopoverPanel } from "@headlessui/react";

/**
 * Props for the reusable Popover component.
 */
export interface PopoverProps {
  /**
   * The element that toggles the popover when clicked.
   * Usually a button, icon, or avatar.
   *
   * @example <button><BellIcon /></button>
   */
  trigger: React.ReactNode;

  /**
   * The content to display inside the floating panel.
   * Can be a list of notifications, a menu, or any React node.
   */
  children: React.ReactNode;

  /**
   * Alignment of the dropdown relative to the trigger.
   * @default "right"
   */
  align?: "left" | "right";

  /**
   * Optional className to override default styles (e.g., width).
   * @default "w-80"
   */
  className?: string;
}

/**
 * A generic, accessible Popover component built on Headless UI.
 * Handles focus management, keyboard navigation, and click-outside behavior automatically.
 *
 * @example
 * ```tsx
 * <Popover trigger={<BellIcon />}>
 * <div className="p-4">You have 3 new messages</div>
 * </Popover>
 * ```
 */
const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  align,
  className = "w-80", // Default width if none provided
}) => {
  return (
    <HeadlessPopover className="relative">
      {/* Using as="div" for the button wrapper because the 'trigger' prop 
        might often contain a <button> itself (like an Avatar button).
        HTML forbids nesting <button> inside <button>. 
        Headless UI handles the click/enter events on this div automatically.
      */}
      <PopoverButton as="div" className="focus:outline-none">
        {trigger}
      </PopoverButton>

      <PopoverPanel
        transition
        anchor="bottom end"
        className={`z-50 mt-2 h-80 rounded-xl ${className} bg-white p-2 shadow-xl transition duration-200 ease-in-out data-closed:-translate-y-2 data-closed:opacity-0 ${align === "right" ? "origin-top-right" : "origin-top-left"}`}
      >
        {/* Inner container handles overflow clipping for rounded corners */}
        <div>{children}</div>
      </PopoverPanel>
    </HeadlessPopover>
  );
};

export default Popover;
