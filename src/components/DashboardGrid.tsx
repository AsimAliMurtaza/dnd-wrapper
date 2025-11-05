"use client";

import React from "react";
import DashboardCard from "@/components/DashboardCard";
import DraggableWrapper from "@/components/DraggableWrapper";
import { DollarSign, Users, Activity, BarChart } from "lucide-react";

export default function DashboardGrid() {
  const cards = [
    { id: "revenue", title: "Revenue", value: "$12,340", icon: <DollarSign /> },
    { id: "users", title: "Active Users", value: "2,145", icon: <Users /> },
    { id: "engagement", title: "Engagement", value: "78%", icon: <Activity /> },
    {
      id: "conversions",
      title: "Conversions",
      value: "182",
      icon: <BarChart />,
    },
    { id: "sessions", title: "Sessions", value: "5,430", icon: <Activity /> },
    {
      id: "bounceRate",
      title: "Bounce Rate",
      value: "34%",
      icon: <BarChart />,
    },
    { id: "newUsers", title: "New Users", value: "1,230", icon: <Users /> },
    { id: "sales", title: "Sales", value: "$8,760", icon: <DollarSign /> },
    { id: "traffic", title: "Traffic", value: "15,230", icon: <Activity /> },
    { id: "orders", title: "Orders", value: "320", icon: <BarChart /> },
  ];

  return (
    <DraggableWrapper
      items={cards.map((c) => c.id)}
      renderItem={(id) => {
        const card = cards.find((c) => c.id === id)!;
        return (
          <DashboardCard
            title={card.title}
            value={card.value}
            icon={card.icon}
            color="teal"
          />
        );
      }}
      onReorder={(order) => console.log("New order:", order)}
    />
  );
}
