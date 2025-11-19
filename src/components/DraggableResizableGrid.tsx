"use client";

import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider, Layouts, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridProps {
  storageKey: string;
  initialLayout: Layout[];
  initialMode?: boolean;
  renderItem: (id: string) => React.ReactNode;
  breakpoints?: Record<string, number>;
  cols?: Record<string, number>;
}

const DraggableResizableGrid: React.FC<GridProps> = ({
  storageKey,
  initialLayout,
  initialMode = false,
  renderItem,
  breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 },
  cols = { lg: 12, md: 10, sm: 6, xs: 4 },
}) => {
  const [layouts, setLayouts] = useState<Layouts>({
    lg: initialLayout,
  });

  const [editMode, setEditMode] = useState(initialMode);

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    if (editMode) {
      setLayouts(allLayouts);
    }
  };

  const handleSave = async () => {
    try {
      await fetch(`/api/layout`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ layout: layouts.lg }),
      });
    } catch (error) {
      console.error("Failed to save layout config:", error);
    }
    setEditMode(false);
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
      {/* EDIT MODE TOGGLE */}
      <div className="flex justify-end mb-4">
        {!editMode ? (
          <button
            className="px-4 py-2 rounded-2xl bg-teal-600 text-white"
            onClick={() => setEditMode(true)}
          >
            Customize Layout
          </button>
        ) : (
          <button
            className="px-4 py-2 rounded-2xl bg-gray-600 text-white"
            onClick={handleSave}
          >
            Done
          </button>
        )}
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={100}
        margin={[20, 20]}
        isDraggable={editMode}
        isResizable={editMode}
        onLayoutChange={handleLayoutChange}
        measureBeforeMount={false}
        useCSSTransforms={true}
        preventCollision={false}
        compactType={null}
      >
        {layouts.lg.map((item) => (
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
