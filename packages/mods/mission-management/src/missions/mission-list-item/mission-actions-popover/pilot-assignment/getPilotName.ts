import type { PilotsAvailable } from "@voloiq-typescript-api/crew-api-types";
import { P, match } from "ts-pattern";

export const getPilotName = (pilot?: PilotsAvailable) =>
    match(pilot)
        .with(undefined, { firstName: P.nullish, surName: P.nullish }, () => "")
        .with({ firstName: P.nullish, surName: P.string }, (pilot) => pilot.surName)
        .with({ firstName: P.string, surName: P.nullish }, (pilot) => pilot.firstName)
        .with({ firstName: P.string, surName: P.string }, (pilot) => `${pilot.firstName} ${pilot.surName}`)
        .exhaustive();
