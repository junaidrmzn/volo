import { BaseDto, PadService, Point } from "../common/apiModels";
import { PadEvent } from "../pad-events/apiModels";

export type PadCreate = {
    padKey: string;
    externalId?: string;
    services?: PadService[];
    location: Point;
    validFrom: string;
    validTo?: string;
};

export type PadAllOf = {
    events?: PadEvent[];
    id: string;
    vertiportId?: string;
};

export type Pad = PadCreate & BaseDto & PadAllOf;
export type PadUpdate = PadCreate;
