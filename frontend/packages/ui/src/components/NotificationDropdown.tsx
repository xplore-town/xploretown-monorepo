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

        {/* Mark as Read */}
        <div>
          <h1 onClick={onViewAll} className="text-blue-600">
            Mark as Read
          </h1>
        </div>
      </div>
    </div>
  );

  return <Popover trigger={Trigger}>{Content}</Popover>;
};

export default NotificationDropdown;
