import React, { useEffect, useRef, useState } from "react";
import { NotificationItem } from "@ui/types/navbar";

export interface NotificationDropdownProps {
  notifications: NotificationItem[];
  onViewAll?: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onViewAll,
}) => {
  // 1. State for Visibility
  const [isOpen, setIsOpen] = useState(false);

  // 2. Ref to detect clicks outside the dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 3. Effect to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {};

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]"
    >
      <button
        id="dropdown-scrollable"
        type="button"
        className={`dropdown-toggle btn btn-text btn-circle size-10 ${isOpen ? "dropdown-open:bg-base-content/10" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-label="Notifications"
      >
        <div className="indicator">
          <span className="indicator-item bg-error size-2 rounded-full"></span>
          <span className="icon-[tabler--bell] text-base-content size-5.5"></span>
        </div>
      </button>

      <div
        className={`dropdown-menu dropdown-open:opacity-100 ${isOpen ? "block" : "hidden"}`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-scrollable"
      >
        <div className="dropdown-header justify-center">
          <h6 className="text-base-content text-base">Notifications</h6>
        </div>

        <div className="text-base-content/80 max-h-56 overflow-auto max-md:max-w-60">
          {notifications.map((note) => (
            <div key={note.id} className="dropdown-item">
              <div
                className={`avatar ${note.isAway ? "avatar-away-bottom" : ""} ${note.isOnline ? "avatar-online-bottom" : ""} ${!note.avatar ? "avatar-placeholder" : ""}`}
              >
                {note.avatar ? (
                  <div className="w-10 rounded-full">
                    <img src={note.avatar} alt={note.title} />
                  </div>
                ) : (
                  <div className="bg-neutral text-neutral-content w-10 rounded-full p-2">
                    <span className={`${note.icon || "icon-[tabler--user]"} size-full`}></span>
                  </div>
                )}
              </div>
              <div className="w-60">
                <h6 className="truncate text-base">{note.title}</h6>
                <small className="text-base-content/50 truncate">{note.message}</small>
              </div>
            </div>
          ))}
        </div>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onViewAll?.();
          }}
          className="dropdown-footer justify-center gap-1"
        >
          <span className="icon-[tabler--eye] size-4"></span>
          View all
        </a>
      </div>
    </div>
  );
};

export default NotificationDropdown;
