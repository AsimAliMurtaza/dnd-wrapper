export type CardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon?: React.ReactNode;
  color?: string;
};

export type DraggableWrapperProps = {
  items: string[];
  onReorder?: (newOrder: string[]) => void;
  renderItem: (id: string) => React.ReactNode;
};
