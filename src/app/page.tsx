"use client";

import DraggableResizableGrid from "@/components/DraggableResizableGrid";
import DashboardCard from "@/components/DashboardCard";
import { DollarSign, Users, Activity, BarChart } from "lucide-react";
import { useState, useEffect } from "react";
import { Layouts } from "react-grid-layout";
import { fetchLayoutFromServer } from "@/utils/api-functions";

export default function DashboardPage() {
  const [initialLayout, setInitialLayout] = useState<Layouts>({});
  const userId = 1;

  useEffect(() => {
    const loadLayout = async () => {
      const layout = await fetchLayoutFromServer(userId);
      console.log("Layout loaded in DashboardPage:", layout);
      setInitialLayout(layout);
    };
    loadLayout();
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

  if (Object.keys(initialLayout).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <DraggableResizableGrid
        initialLayouts={initialLayout}
        renderItem={renderElement}
      />
    </div>
  );
}
