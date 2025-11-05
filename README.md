
# DraggableWrapper – Reusable Drag-and-Drop Grid Wrapper

A lightweight, flexible drag-and-drop wrapper built with **@dnd-kit**, designed for **Next.js + Tailwind CSS** dashboards and grids.

It allows you to make any grid layout reorderable — without changing your existing grid or card components.

---

## Features

* **Grid-based drag and drop** (not just vertical lists)
* **Framework-agnostic** – works with any card or component inside a grid
* Plug-and-play – wrap your grid once, everything inside becomes draggable

---

## Installation

```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities framer-motion
```

---

## Basic Usage

### Import and use the wrapper

```
import DraggableWrapper from "@/components/DraggableWrapper";
import MyCard from "@/components/MyCard";

const items = ["card1", "card2", "card3"];

export default function ExampleGrid() {
  return (
    <DraggableWrapper
      items={items}
      renderItem={(id) => (
        <MyCard title={`Card ${id}`} description="Drag me!" />
      )}
      onReorder={(newOrder) => console.log("New order:", newOrder)}
    />
  );
}
```

---

## How It Works

The wrapper uses **@dnd-kit’s** `DndContext` + `SortableContext` under the hood,
so the *grid* itself stays static while **each child item becomes draggable**.

* `items` → Array of unique IDs representing each draggable item
* `renderItem` → Function that renders your custom component for each item
* `onReorder` → Callback that returns the updated item order after drag ends

---

## Example With Tailwind Grid

You don’t need to modify your grid layout (hopefully), just wrap it:

```
<DraggableWrapper
  items={["1", "2", "3", "4"]}
  renderItem={(id) => (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <h3 className="text-lg font-semibold">Widget {id}</h3>
      <p className="text-gray-500">Drag me anywhere</p>
    </div>
  )}
/>
```

The wrapper already includes:

```tsx
<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
```

You can tweak it if you want a custom layout.

## Persistence (Optional)

The wrapper automatically saves layout order in `localStorage`.
You can disable or replace it with your own persistence (e.g. MongoDB, API call)
by removing or modifying this section:

```
useEffect(() => {
  localStorage.setItem("dashboardLayout", JSON.stringify(activeItems));
}, [activeItems]);
```

---

## Extending It

* Change `rectSortingStrategy` → `verticalListSortingStrategy` for list-style UIs
* Customize animations via the `motion.div` props inside `SortableItem`
* Add a grid layout via Tailwind or your CSS framework

---

## Example Folder Structure

```
components/
 ├── DraggableWrapper.tsx
 ├── DashboardCard.tsx
 ├── DashboardGrid.tsx
app/
 └── page.tsx
```

---

## Example Use Cases

* Dashboard widgets (cards, charts, stats)
* Kanban boards
* E-commerce product grids
* Admin panels with customizable layouts

---

## Credits

Built using:

* [@dnd-kit](https://github.com/clauderic/dnd-kit) for drag-and-drop logic
* [Tailwind CSS](https://tailwindcss.com/) for styling

---
