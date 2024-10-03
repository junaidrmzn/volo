import { Waypoint } from "@voloiq/flight-planning-api/v1";

export type SortableListProps = {
    items?: Waypoint[];
    handleDrop: React.DragEventHandler<HTMLLIElement>;
    handleDragOver: React.DragEventHandler<HTMLLIElement>;
    handleDragStart: React.DragEventHandler<HTMLLIElement>;
    onItemSelect: (routeSequenceIndex: number) => void;
    isWaypointList?: boolean;
};

export type SortableListItemWrapperProps = {
    id: string;
    children: React.ReactNode;
    handleDrop: React.DragEventHandler<HTMLLIElement>;
    handleDragOver: React.DragEventHandler<HTMLLIElement>;
    handleDragStart: React.DragEventHandler<HTMLLIElement>;
    isDraggable?: boolean;
};

export type SortableListItemProps = {
    item: Waypoint;
    onClick: (routeSequenceIndex: number) => void;
    isDraggable?: boolean;
};
