"use client";

import DraggableResizableGrid from "@/components/DraggableResizableGrid";
import DashboardCard from "@/components/DashboardCard";
import { DollarSign, Users, Activity, BarChart } from "lucide-react";

export default function DashboardPage() {
  const cards = [
    { id: "revenue", title: "Revenue", value: "$12,340", icon: <DollarSign /> },
    { id: "users", title: "Users", value: "2,145", icon: <Users /> },
    { id: "engagement", title: "Engagement", value: "78%", icon: <Activity /> },
    { id: "sales", title: "Sales", value: "$8,760", icon: <BarChart /> },
    {
      id: "revesnues",
      title: "Revenue",
      value: "$12,340",
      icon: <DollarSign />,
    },
    { id: "usesrs", title: "Users", value: "2,145", icon: <Users /> },
    {
      id: "engasgesment",
      title: "Engagement",
      value: "78%",
      icon: <Activity />,
    },
    { id: "saless", title: "Sales", value: "$8,760", icon: <BarChart /> },
  ];

  const initialLayout = [
    { i: "revenue", x: 0, y: 0, w: 3, h: 2 },
    { i: "users", x: 3, y: 0, w: 3, h: 2 },
    { i: "engagement", x: 6, y: 0, w: 3, h: 2 },
    { i: "sales", x: 9, y: 0, w: 3, h: 2 },
    { i: "revesnues", x: 0, y: 2, w: 3, h: 2 },
    { i: "usesrs", x: 3, y: 2, w: 3, h: 2 },
    { i: "engasgesment", x: 6, y: 2, w: 3, h: 2 },
    { i: "saless", x: 9, y: 2, w: 3, h: 2 },
  ];

  const renderCard = (id: string) => {
    const card = cards.find((c) => c.id === id);
    if (!card) return null;

    return (
      <DashboardCard
        title={card.title}
        value={card.value}
        icon={card.icon}
        color="teal"
      />
    );
  };

  return (
    <DraggableResizableGrid
      initialLayout={initialLayout}
      renderItem={renderCard}
      storageKey={"dashboard-layout"}
    />
  );
}
