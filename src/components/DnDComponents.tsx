import { useDraggable, useDroppable } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DndBaseProps = {
  id: string;
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
};

export type DroppableProps = DndBaseProps & { dropClassName?: string };
export type DraggableProps = DndBaseProps;

export function Droppable({
  id,
  children,
  className,
  dropClassName,
}: DroppableProps) {
  const { ref, isDropTarget } = useDroppable({ id });

  return (
    <div
      ref={ref}
      className={cn(className, {
        [dropClassName ?? ""]: isDropTarget,
      })}
    >
      {isDropTarget ? (
        <p className="text-blue-500 text-center">Release to drop</p>
      ) : (
        <p className="text-gray-400 text-center">Drag blocks here</p>
      )}
      {children}
    </div>
  );
}

export function Draggable({
  id,
  children,
  className,
  isDisabled,
}: DraggableProps) {
  const { ref, isDragging } = useDraggable({ id });

  if (isDisabled) return children;

  return (
    <div
      ref={ref}
      className={cn(className, isDragging && "scale-120 border-1")}
    >
      {children}
    </div>
  );
}

type SortableProps = {
  id: string;
  index: number;
  children: ReactNode;
};

export function Sortable({ id, index, children }: SortableProps) {
  const { ref } = useSortable({ id, index });

  return <div ref={ref}>{children}</div>;
}
