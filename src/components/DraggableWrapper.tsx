"use client";

import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DraggableWrapperProps } from "@/types/types";

export default function DraggableWrapper({
  items,
  onReorder,
  renderItem,
}: DraggableWrapperProps) {
  const [activeItems, setActiveItems] = useState(items);
  const sensors = useSensors(useSensor(PointerSensor));

  //for persisting layout in localStorage for now
  useEffect(() => {
    const saved = localStorage.getItem("dashboardLayout");
    console.log("loaded layout", saved);
    if (saved) setActiveItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardLayout", JSON.stringify(activeItems));
  }, [activeItems]);

  //handle drag end event
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = activeItems.indexOf(active.id as string);
      const newIndex = activeItems.indexOf(over?.id as string);
      const newOrder = arrayMove(activeItems, oldIndex, newIndex);
      setActiveItems(newOrder);
      onReorder?.(newOrder);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={activeItems} strategy={rectSortingStrategy}>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {activeItems.map((id) => (
            <SortableItem key={id} id={id}>
              {renderItem(id)}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

/** this function makes each item sortable using useSortable hook.
 *  i removed motion.div for simplicity. custom animation can be
 * added in the return( <motion.div>animations logic</motion.div>) with framer-motion */
function SortableItem({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || "transform 200ms ease",
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}
