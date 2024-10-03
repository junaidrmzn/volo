import { assign } from "xstate";
import type { DeleteContext } from "./DeleteContext";

export const deleteResource = <Resource>() =>
    assign<DeleteContext<Resource>>({
        selectedResource: () => undefined,
    });
