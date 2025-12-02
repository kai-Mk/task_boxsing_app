"use client";

import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
};

const Toast = ({
  message,
  type = "success",
  onClose,
  duration = 1500,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 表示アニメーション開始
    requestAnimationFrame(() => setIsVisible(true));

    // 消えるアニメーション開始
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration - 300);

    // 完全に消えたらonClose
    const closeTimer = setTimeout(onClose, duration);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose, duration]);

  return (
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-lg shadow-lg text-sm ${
          type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white`}
      >
        {message}
      </div>
    </div>
  );
};

export default Toast;
