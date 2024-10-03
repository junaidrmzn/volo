import type { DoneInvokeEvent } from "xstate";
import { assign } from "xstate";
import type { ResponseEnvelope } from "@voloiq/service";
import type { DetailsContext } from "./DetailsContext";

export const loadDetails = <Resource>() =>
    assign<DetailsContext<Resource>, DoneInvokeEvent<ResponseEnvelope<Resource>>>({
        selectedResource: (_, event) => event.data.data,
    });

export const closeDetails = <Resource>() =>
    assign<DetailsContext<Resource>>({
        selectedResource: () => undefined,
    });
