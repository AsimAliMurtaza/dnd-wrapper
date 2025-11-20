import { Layouts } from "react-grid-layout";

export async function saveLayoutToServer(layouts: Layouts) {
  try {
    await fetch(`https://localhost:7029/api/Layout`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: 1,
        layout: layouts,
      }),
    });
    console.log("Layout saved successfully", layouts);
  } catch (err) {
    console.error("Failed to save layout:", err);
  }
}

export async function fetchLayoutFromServer(userId: number): Promise<Layouts> {
  try {
    const response = await fetch(`https://localhost:7029/api/Layout/${userId}`);
    const data = await response.json();
    console.log("Fetched layout:", data);
    return data;
  } catch (error) {
    console.error("Failed to load layout config:", error);
    return {};
  }
}
