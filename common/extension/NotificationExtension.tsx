"use client";

import React, { useEffect, useState } from "react";
import {
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconInfoCircle,
} from "@tabler/icons-react";

export type NotificationType = "success" | "error" | "warn" | "info";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title?: string;
  message?: string;
  autoClose?: number; // ms
  onClose?: () => void;
  onOpen?: () => void;
}

type Listener = (items: NotificationItem[]) => void;

let notifications: NotificationItem[] = [];
const listeners = new Set<Listener>();

function notifyListeners() {
  listeners.forEach((listener) => listener([...notifications]));
}

function addNotification(item: Omit<NotificationItem, "id">): string {
  const id = Math.random().toString(36).substring(2, 9);
  const newItem: NotificationItem = {
    ...item,
    id,
    autoClose: item.autoClose !== undefined ? item.autoClose : 3500,
  };

  notifications = [...notifications, newItem];
  notifyListeners();

  if (newItem.onOpen) {
    try {
      newItem.onOpen();
    } catch (e) {
      console.error(e);
    }
  }

  if (newItem.autoClose && newItem.autoClose > 0) {
    setTimeout(() => {
      removeNotification(id);
    }, newItem.autoClose);
  }

  return id;
}

export function removeNotification(id: string) {
  const item = notifications.find((n) => n.id === id);
  if (item && item.onClose) {
    try {
      item.onClose();
    } catch (e) {
      console.error(e);
    }
  }
  notifications = notifications.filter((n) => n.id !== id);
  notifyListeners();
}

function Success(noti?: string, title: string = "Thành công") {
  addNotification({
    type: "success",
    title,
    message: noti,
  });
}

function SuccessTimeonClose(noti: string, url: string, title: string = "Thông báo") {
  addNotification({
    type: "success",
    title,
    message: noti,
    autoClose: 1200,
    onClose: () => {
      window.location.href = url;
    },
  });
}

function SuccessTimeonOpen(noti: string, url: string, title: string = "Thông báo") {
  addNotification({
    type: "success",
    title,
    message: noti,
    autoClose: 1200,
    onOpen: () => {
      window.location.href = url;
    },
  });
}

function Fails(noti: string, title: string = "Thông báo lỗi") {
  addNotification({
    type: "error",
    title,
    message: noti,
  });
}

function Info(noti: string, title: string = "Thông báo") {
  addNotification({
    type: "info",
    title,
    message: noti,
  });
}

function Warn(noti: string, title: string = "Cảnh báo") {
  addNotification({
    type: "warn",
    title,
    message: noti,
  });
}

export const NotificationExtension = {
  Success,
  Fails,
  Info,
  Warn,
  SuccessTimeonClose,
  SuccessTimeonOpen,
  addNotification,
  removeNotification,
};

/**
 * Component hiển thị danh sách thông báo Toast với thiết kế chuẩn Tailwind CSS.
 * Đặt component này vào `app/layout.tsx` để có thể nhận thông báo từ bất kỳ đâu.
 */
export function NotificationContainer() {
  const [items, setItems] = useState<NotificationItem[]>([]);

  useEffect(() => {
    const listener = (newItems: NotificationItem[]) => {
      setItems(newItems);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed top-5 right-5 z-[99999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {items.map((item) => {
        const isSuccess = item.type === "success";
        const isError = item.type === "error";
        const isWarn = item.type === "warn";
        const isInfo = item.type === "info";

        return (
          <div
            key={item.id}
            role="alert"
            className={`pointer-events-auto w-full flex items-start gap-3 p-3.5 bg-white dark:bg-slate-900 rounded-xl shadow-xl border transition-all duration-300 ${
              isSuccess
                ? "border-emerald-200 dark:border-emerald-900/50 bg-gradient-to-r from-emerald-50/30 to-white dark:from-emerald-950/20 dark:to-slate-900"
                : isError
                ? "border-rose-200 dark:border-rose-900/50 bg-gradient-to-r from-rose-50/30 to-white dark:from-rose-950/20 dark:to-slate-900"
                : isWarn
                ? "border-amber-200 dark:border-amber-900/50 bg-gradient-to-r from-amber-50/30 to-white dark:from-amber-950/20 dark:to-slate-900"
                : "border-sky-200 dark:border-sky-900/50 bg-gradient-to-r from-sky-50/30 to-white dark:from-sky-950/20 dark:to-slate-900"
            }`}
          >
            {/* Icon */}
            <div
              className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                isSuccess
                  ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400"
                  : isError
                  ? "bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                  : isWarn
                  ? "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
                  : "bg-sky-100 text-sky-600 dark:bg-sky-950 dark:text-sky-400"
              }`}
            >
              {isSuccess && <IconCheck size={18} stroke={2.5} />}
              {isError && <IconX size={18} stroke={2.5} />}
              {isWarn && <IconAlertTriangle size={18} stroke={2.5} />}
              {isInfo && <IconInfoCircle size={18} stroke={2.5} />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              {item.title && (
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  {item.title}
                </h4>
              )}
              {item.message && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed break-words font-medium">
                  {item.message}
                </p>
              )}
            </div>

            {/* Close button */}
            <button
              type="button"
              onClick={() => removeNotification(item.id)}
              className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <IconX size={14} stroke={2} />
            </button>
          </div>
        );
      })}
    </div>
  );
}