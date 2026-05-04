import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "success",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor = type === "success" ? "bg-emerald-500" : "bg-red-500";

  return (
    <div
      className={`fixed top-4 right-4 px-6 py-3 text-white rounded-lg shadow-lg ${bgColor}`}
    >
      {message}
    </div>
  );
}
