import { Layouts } from "react-grid-layout";

export type CardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
};

export type DraggableWrapperProps = {
  items: string[];
  renderItem: (id: string) => React.ReactNode;
  onReorder?: (newOrder: string[]) => void;
  storageKey?: string;
  gridClassName?: string;
};

export interface GridProps {
  initialLayouts: Layouts;
  renderItem: (id: string) => React.ReactNode;
  breakpoints?: Record<string, number>;
  cols?: Record<string, number>;
}
