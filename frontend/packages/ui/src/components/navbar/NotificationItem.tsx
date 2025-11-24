import React from "react";
import { TbMessage } from "react-icons/tb";
import type { NotificationItem as NotificationItemType } from "../../types/navbar";

interface NotificationItemProps {
  item: NotificationItemType;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ item }) => {
  return (
    <div className="flex cursor-pointer gap-3 border-b border-gray-50 px-4 py-3 transition-colors last:border-0 hover:bg-gray-50">
      {/* --- Avatar Section --- */}
      <div className="shrink-0 pt-1">
        <div className="relative">
          {item.avatar ? (
            <img
              src={item.avatar}
              alt=""
              className="h-9 w-9 rounded-full border border-gray-200 object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600">
              {React.isValidElement(item.icon) ? item.icon : <TbMessage />}
            </div>
          )}

          {/* Status Dots (Online/Away) */}
          {item.isOnline && (
            <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
          )}
          {item.isAway && (
            <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-gray-400" />
          )}
        </div>
      </div>

      {/* --- Text Section --- */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between">
          <p className="truncate text-sm font-medium text-gray-900">{item.title}</p>
          {item.time && (
            <span className="ml-2 text-[10px] whitespace-nowrap text-gray-400">{item.time}</span>
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-xs font-normal text-gray-500">{item.message}</p>
      </div>
    </div>
  );
};

export default NotificationItem;
