import type { Meta } from "@storybook/react";
import { I18nProvider } from "@voloiq/i18n";
import { CrewScheduler } from "./CrewScheduler";
import { FlightTimeLimitation } from "./models";

const meta: Meta = {
    title: "Crew Scheduler/Crew Scheduler",
    component: CrewScheduler,
    parameters: { actions: { argTypesRegex: "^on.*" } },
    args: {},
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

const flightTimeLimitationData: FlightTimeLimitation = {
    restBefore: 1_209_600,
    restAfter: 1_209_600,
    minRestBefore: 43_200,
    minRestAfter: 43_200,
    missions: [
        {
            reportOn: "2023-06-05T10:55:00Z",
            departureVertiportCode: "PAU",
            estimatedDeparture: "2023-06-05T11:00:00Z",
            arrivalVertiportCode: "PAU",
            estimatedArrival: "2023-06-05T12:00:00Z",
            departureTimeZone: "Europe/Paris",
            arrivalTimeZone: "Europe/Paris",
            reportOff: "2023-06-05T12:05:00Z",
        },
        {
            reportOn: "2023-06-05T10:55:00Z",
            departureVertiportCode: "PAU",
            estimatedDeparture: "2023-06-05T11:00:00Z",
            arrivalVertiportCode: "PAU",
            estimatedArrival: "2023-06-05T12:00:00Z",
            departureTimeZone: "Europe/Paris",
            arrivalTimeZone: "Europe/Paris",
            reportOff: "2023-06-05T12:05:00Z",
        },
    ],
    totalFlightTime: 3600,
    totalDutyTime: 4200,
    maxFlightTime: 36_000,
    maxDutyTime: 43_200,
};

export const Basic = () => {
    return (
        <CrewScheduler
            headerLabel="on duty today"
            crewName="Petrik"
            flightTimeLimitation={flightTimeLimitationData}
            onRedirectToResource={() => {}}
        />
    );
};
