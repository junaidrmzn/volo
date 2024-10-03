import merge from "lodash.merge";
import { DeepPartial } from "@voloiq/utils";
import { Negotiate } from "./negotiate";

export const anyNegotiate = (overwrites: DeepPartial<Negotiate> = {}): Negotiate =>
    merge({ token: "326fa915-efc5-48ee-ad14-b6f6c25001b8", url: "ws://websocket.io" }, overwrites);
