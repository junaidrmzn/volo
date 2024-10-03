import { DoneInvokeEvent, assign } from "xstate";
import { ResponseEnvelope } from "@voloiq/service";
import { SplitPreviewContext } from "./SplitPreviewContext";

export const loadSplitPreview = <Resource>() =>
    assign<SplitPreviewContext<Resource>, DoneInvokeEvent<ResponseEnvelope<Resource>>>({
        selectedResource: (_, event) => event.data.data,
    });
