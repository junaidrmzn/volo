import { useSortable } from "@dnd-kit/sortable";
import { createContext } from "react";

type UseSortableReturn = ReturnType<typeof useSortable>;

export type DragHandlePropsContextType = UseSortableReturn["attributes"] | UseSortableReturn["listeners"];

export const DragHandlePropsContext = createContext<DragHandlePropsContextType | undefined>(undefined);
