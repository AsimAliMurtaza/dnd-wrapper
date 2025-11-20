"use client";

import { saveLayoutToServer } from "@/utils/api-functions";
import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider, Layouts, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { GridProps } from "@/types/types";

const ResponsiveGridLayout = WidthProvider(Responsive);
const DraggableResizableGrid: React.FC<GridProps> = ({
  initialLayouts,
  renderItem,
  breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480 },
  cols = { lg: 12, md: 10, sm: 6, xs: 4 },
}) => {
  const [layouts, setLayouts] = useState<Layouts>(initialLayouts);
  const [editMode, setEditMode] = useState(false);

  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    if (editMode) {
      // RGL gives ALL breakpoint layouts here
      setLayouts(allLayouts);
    }
  };

  const handleSave = async () => {
    try {
      await saveLayoutToServer(layouts);
    } catch (error) {
      console.error("Error saving layout to server:", error);
    }
    setEditMode(false);
  };

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl">
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
        compactType={null}
        preventCollision={false}
      >
        {layouts.lg?.map((item) => (
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
