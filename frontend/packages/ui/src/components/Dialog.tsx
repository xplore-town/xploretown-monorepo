import {
  Dialog as HeadlessDialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React from "react";
import type { BaseComponentProps, VoidCallback, Size } from "../types";

export interface DialogProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: VoidCallback;
  title?: string;
  children: React.ReactNode;
  size?: Extract<Size, "sm" | "md" | "lg" | "xl">;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, title, children, size = "md" }) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <HeadlessDialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel
                className={`${sizeClasses[size]} w-full transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                {title && (
                  <HeadlessDialog.Title className="text-lg leading-6 font-medium text-gray-900">
                    {title}
                  </HeadlessDialog.Title>
                )}
                <div className={title ? "mt-4" : ""}>{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};

export default Dialog;
