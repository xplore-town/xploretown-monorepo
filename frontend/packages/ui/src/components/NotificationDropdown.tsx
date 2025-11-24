import React from "react";
import type { NotificationItem } from "../types/navbar";
import { TbBell } from "react-icons/tb";
import Popover from "./Popover";

export interface NotificationDropdownProps {
  notifications: NotificationItem[];
  onViewAll?: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onViewAll,
}) => {
  const Trigger = (
    <div className="relative flex h-10 w-10 cursor-pointer rounded-full bg-gray-50 p-2 shadow-md">
      <TbBell className="size-6" />

      {notifications.length > 0 && (
        <span className="absolute top-2 right-2 size-2.5 rounded-full border-white bg-red-500 drop-shadow-lg"></span>
      )}
    </div>
  );

  const Content = (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* Header */}
      <div className="flex-none">
        <h1>Notifications</h1>
      </div>

      {/* Scrollable List */}
      <div className="flex-1">
        <div className="">
          {notifications.length === 0 ? (
            <p>No New Notifications</p>
          ) : (
            notifications.map((notification, i) => (
              <div key={i}>
                <p>{notification.id}</p>
                <p>{notification.title}</p>
                <p>{notification.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
      {/* Mark as Read */}
      <div>
        <h1 onClick={onViewAll} className="text-blue-600">
          Mark as Read
        </h1>
      </div>
    </div>
  );

  return <Popover trigger={Trigger}>{Content}</Popover>;
};

export default NotificationDropdown;
