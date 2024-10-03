import type { DoneInvokeEvent } from "xstate";
import { assign } from "xstate";
import type { ResponseEnvelope } from "@voloiq/service";
import type { MultiPreviewContext } from "./MultiPreviewContext";

export const moveToContext = <Resource>() =>
    assign<MultiPreviewContext<Resource>, DoneInvokeEvent<ResponseEnvelope<Resource[]>>>({
        selectedElements: (_, event) => event.data.data,
    });
