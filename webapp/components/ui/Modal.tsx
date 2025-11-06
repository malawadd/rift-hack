"use client";

import { ReactNode, useEffect } from "react";
import { Button } from "./Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeStyles = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] w-full ${sizeStyles[size]} max-h-[90vh] overflow-y-auto`}
      >
        <div className="sticky top-0 bg-white border-b-4 border-black p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-[var(--dark-navy)]">{title}</h2>
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
