import { assign } from "xstate";
import type { ResourceContext } from "./ResourceContext";
import type { SelectEvent, UnselectEvent } from "./ResourceEvent";

export const selectResource = () =>
    assign<ResourceContext, SelectEvent>({
        selectedResourceId: (_, event) => event.selectedResourceId,
    });

export const unselectResource = () =>
    assign<ResourceContext, UnselectEvent>({
        selectedResourceId: () => undefined,
    });
