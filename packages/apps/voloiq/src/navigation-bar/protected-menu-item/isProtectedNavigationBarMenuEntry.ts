import type { ReactElement } from "react";
import type { ProtectedNavigationBarMenuEntryProps } from "./ProtectedNavigationBarMenuEntry";
import { ProtectedNavigationBarMenuEntry } from "./ProtectedNavigationBarMenuEntry";

export const isProtectedNavigationBarMenuEntry = (
    element: ReactElement
): element is ReactElement<ProtectedNavigationBarMenuEntryProps> => element.type === ProtectedNavigationBarMenuEntry;
