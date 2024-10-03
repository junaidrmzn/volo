import { P, match } from "ts-pattern";

type Pilot = {
    pilotFirstName?: string;
    pilotMiddleName?: string;
    pilotSurName?: string;
};
export const getPilotName = (pilot?: Pilot) =>
    match(pilot)
        .with(undefined, { pilotFirstName: P.nullish, pilotMiddleName: P.nullish, pilotSurName: P.nullish }, () => "")
        .with(
            { pilotFirstName: P.nullish, pilotMiddleName: P.nullish, pilotSurName: P.string },
            (pilot) => pilot.pilotSurName
        )
        .with(
            { pilotFirstName: P.nullish, pilotMiddleName: P.string, pilotSurName: P.nullish },
            (pilot) => pilot.pilotMiddleName
        )
        .with(
            { pilotFirstName: P.nullish, pilotMiddleName: P.string, pilotSurName: P.string },
            (pilot) => `${pilot.pilotMiddleName} ${pilot.pilotSurName}`
        )
        .with(
            { pilotFirstName: P.string, pilotMiddleName: P.nullish, pilotSurName: P.string },
            (pilot) => `${pilot.pilotFirstName} ${pilot.pilotSurName}`
        )
        .with(
            { pilotFirstName: P.string, pilotMiddleName: P.nullish, pilotSurName: P.nullish },
            (pilot) => pilot.pilotFirstName
        )
        .with(
            { pilotFirstName: P.string, pilotMiddleName: P.string, pilotSurName: P.nullish },
            (pilot) => `${pilot.pilotFirstName} ${pilot.pilotMiddleName}`
        )
        .with(
            { pilotFirstName: P.string, pilotMiddleName: P.string, pilotSurName: P.string },
            (pilot) => `${pilot.pilotFirstName} ${pilot.pilotMiddleName} ${pilot.pilotSurName}`
        )
        .exhaustive();
