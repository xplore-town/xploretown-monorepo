import React from "react";
import type { NotificationItem } from "../types/navbar";

export interface NotificationDropdownProps {
  notifications: NotificationItem[];
  onViewAll?: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = () => {
  return (
    <div>
      <div>NotificationDropdown</div>
      {/* TODO: Implement notification dropdown UI */}
    </div>
  );
};

export default NotificationDropdown;
