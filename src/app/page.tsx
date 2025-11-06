"use client";

import DraggableResizableGrid from "@/components/DraggableResizableGrid";
import DashboardCard from "@/components/DashboardCard";
import { DollarSign, Users, Activity, BarChart } from "lucide-react";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [initialLayout, setInitialLayout] = useState<any[]>([]);

  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await fetch("/api/layout");
        const data = await response.json();
        console.log("Fetched layout:", data.layout);
        setInitialLayout(data.layout);
      } catch (error) {
        console.error("Failed to load layout config:", error);
      }
    };
    fetchLayout();
  }, []);

  const cards = [
    { id: "revenue", title: "Revenue", value: "$12,340", icon: <DollarSign /> },
    { id: "users", title: "Users", value: "2,145", icon: <Users /> },
    { id: "engagement", title: "Engagement", value: "78%", icon: <Activity /> },
    { id: "sales", title: "Sales", value: "$8,760", icon: <BarChart /> },
  ];

  const heroSection = (
    <div className="mb-8 p-6 bg-white dark:bg-gray-800">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        Welcome to your analytics dashboard. Here you can find an overview of
        your key metrics and performance indicators.
      </p>
      <div className="mt-4 p-4 rounded-lg">
        <ul className="list-disc list-inside space-y-1">
          <li>Drag and drop cards to rearrange your dashboard layout.</li>
          <li>Resize cards to customize the view of your data.</li>
          <li>Your layout will be saved automatically for future visits.</li>
        </ul>
      </div>
    </div>
  );

  // const initialLayout = [
  //   { i: "revenue", x: 0, y: 0, w: 3, h: 2 },
  //   { i: "users", x: 3, y: 0, w: 3, h: 2 },
  //   { i: "engagement", x: 6, y: 0, w: 3, h: 2 },
  //   { i: "sales", x: 9, y: 0, w: 3, h: 2 },
  //   { i: "hero", x: 0, y: 2, w: 12, h: 2 },
  // ];

  // const renderCard = (id: string) => {
  //   const card = cards.find((c) => c.id === id);
  //   if (!card) return null;

  //   return (
  //     <DashboardCard
  //       title={card.title}
  //       value={card.value}
  //       icon={card.icon}
  //       color="teal"
  //     />
  //   );
  // };

  const renderElement = (id: string) => {
    if (id === "hero") {
      return heroSection;
    }
    const card = cards.find((c) => c.id === id);
    if (!card) return null;

    return (
      <DashboardCard
        title={card.title}
        value={card.value}
        icon={card.icon}
        color="green"
      />
    );
  };

  if (initialLayout.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <DraggableResizableGrid
        initialLayout={initialLayout}
        renderItem={renderElement}
        storageKey={"dashboard-layout"}
      />
    </div>
  );
}
