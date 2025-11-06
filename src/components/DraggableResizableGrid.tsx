"use client";

import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridProps {
  storageKey: string;
  initialLayout: Layout[];
  renderItem: (id: string) => React.ReactNode;
  breakpoints?: Record<string, number>;
  cols?: Record<string, number>;
}

const DraggableResizableGrid: React.FC<GridProps> = ({
  storageKey,
  initialLayout,
  renderItem,
  breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 },
  cols = { lg: 12, md: 10, sm: 6, xs: 4 },
}) => {
  const [layout, setLayout] = useState<Layout[]>(initialLayout);

  // Load layout from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLayout(parsed);
      } catch {
        console.warn("Invalid saved layout, using defaults");
      }
    }
  }, [storageKey]);

  const handleLayoutChange = (newLayout: Layout[]) => {
    setLayout(newLayout);
    localStorage.setItem(storageKey, JSON.stringify(newLayout));
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={100}
        margin={[20, 20]}
        isDraggable={true}
        isResizable={true}
        onLayoutChange={handleLayoutChange}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
          >
            {renderItem(item.i)}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default DraggableResizableGrid;
