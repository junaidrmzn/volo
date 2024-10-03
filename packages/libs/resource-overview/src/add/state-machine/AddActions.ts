import { assign } from "xstate";
import type { AddContext } from "./AddContext";
import type { SetResourceInContextEvent } from "./AddEvent";

export const setSelectedResourceId = () =>
    assign<AddContext, SetResourceInContextEvent>({
        selectedResourceId: (_, event) => event.selectedResourceId,
    });
