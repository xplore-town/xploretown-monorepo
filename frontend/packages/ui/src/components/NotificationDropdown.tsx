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
    <div>
      <TbBell className="size-5" />
    </div>
  );

  const Content = (
    <div>
      {/* Header */}
      <div className="">
        <h1>Notifications</h1>
      </div>

      {/* Scrollable List */}
      <div className="">
        <div className="bg-red-400">
          {notifications.length === 0 ? (
            <p>No New Notifications</p>
          ) : (
            notifications.map((notification, i) => <p key={i}>{notification.title}</p>)
          )}
        </div>

        {/* Mark as Read */}
        <div>
          <h1 onClick={onViewAll} className="text-red-400">
            Mark as Read
          </h1>
        </div>
      </div>
    </div>
  );

  return <Popover trigger={Trigger}>{Content}</Popover>;
};

export default NotificationDropdown;
