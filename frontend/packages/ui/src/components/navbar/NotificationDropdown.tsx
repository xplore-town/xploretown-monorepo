import React from "react";
import { TbBell, TbCheck } from "react-icons/tb";
import type { NotificationItem as NotificationItemType, VoidCallback } from "../../types";
import NotificationItem from "./NotificationItem";
import Popover from "../Popover";

export interface NotificationDropdownProps {
  notifications: NotificationItemType[];
  onViewAll?: VoidCallback;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications = [],
  onViewAll,
}) => {
  // --- Trigger (The Bell) ---
  const Trigger = (
    <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600">
      <TbBell className="h-6 w-6" />

      {/* Red Dot Indicator */}
      {notifications.length > 0 && (
        <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500 drop-shadow-sm" />
      )}
    </div>
  );

  // --- Content (The Panel) ---
  const Content = (
    // -mx-2 -my-2 counteracts the padding in the generic Popover
    <div className="-mx-2 -my-2 flex max-h-[400px] w-80 flex-col overflow-hidden rounded-xl bg-white">
      {/* Sticky Header */}
      <div className="z-10 flex flex-none items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
        {notifications.length > 0 && (
          <span className="rounded-full border border-blue-100 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600">
            {notifications.length} New
          </span>
        )}
      </div>

      {/* Scrollable List */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-4 py-12 text-gray-400">
            <TbBell className="h-8 w-8 opacity-20" />
            <p className="text-sm">No new notifications</p>
          </div>
        ) : (
          notifications.map((note) => <NotificationItem key={note.id} item={note} />)
        )}
      </div>

      {/* Sticky Footer */}
      <div className="z-10 flex-none border-t border-gray-100 bg-gray-50 p-2">
        <button
          onClick={onViewAll}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-transparent px-4 py-2 text-xs font-medium text-blue-600 transition-all hover:border-gray-200 hover:bg-white hover:shadow-sm"
        >
          <TbCheck className="text-base" />
          Mark all as read
        </button>
      </div>
    </div>
  );

  return <Popover trigger={Trigger}>{Content}</Popover>;
};

export default NotificationDropdown;
