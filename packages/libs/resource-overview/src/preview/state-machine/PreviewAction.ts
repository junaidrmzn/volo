import type { DoneInvokeEvent } from "xstate";
import { assign } from "xstate";
import type { ResponseEnvelope } from "@voloiq/service";
import type { PreviewContext } from "./PreviewContext";

export const loadPreview = <Resource>() =>
    assign<PreviewContext<Resource>, DoneInvokeEvent<ResponseEnvelope<Resource>>>({
        selectedResource: (_, event) => event.data.data,
    });

export const closePreview = <Resource>() =>
    assign<PreviewContext<Resource>>({
        selectedResource: () => undefined,
    });
