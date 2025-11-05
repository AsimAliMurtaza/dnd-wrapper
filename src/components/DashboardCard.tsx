"use client";

import React from "react";
import { CardProps } from "@/types/types";

export default function DashboardCard({
  title,
  value,
  subtitle,
  icon,
  color,
}: CardProps) {
  const colorMap: Record<string, string> = {
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    teal: "bg-teal-100 text-teal-600",
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            colorMap[color || "teal"]
          }`}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
