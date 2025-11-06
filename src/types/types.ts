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
