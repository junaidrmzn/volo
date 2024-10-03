import type { Meta } from "@storybook/react";
import { HStack } from "@volocopter/design-library-react";
import { Fragment } from "react";
import { MissionItem } from "./MissionItem";
import { assignmentStates } from "./useGetAssignmentColor";

const meta: Meta = {
    title: "Network Schedule Planning/Mission Item",
};
export default meta;

export const Basic = () => (
    <MissionItem
        width={115}
        arrivalVertiport="BRU"
        departureVertiport="KAR"
        flightNumber="VC199711"
        pilotAssignment="assigned"
        batteryAssignment="assigned"
    />
);
export const WithWarning = () => (
    <HStack>
        <MissionItem
            width={115}
            arrivalVertiport="BRU"
            departureVertiport="KAR"
            flightNumber="VC199711"
            pilotAssignment="assigned"
            batteryAssignment="assigned"
            isDueSoon
        />
    </HStack>
);
export const WithDifferentAssignmentStates = () => (
    <HStack>
        {assignmentStates.map((pilotAssignment) => (
            <Fragment key={pilotAssignment}>
                {assignmentStates.map((batteryAssignment) => (
                    <MissionItem
                        key={batteryAssignment}
                        width={115}
                        arrivalVertiport="BRU"
                        departureVertiport="KAR"
                        flightNumber="VC199711"
                        pilotAssignment={pilotAssignment}
                        batteryAssignment={batteryAssignment}
                    />
                ))}
            </Fragment>
        ))}
    </HStack>
);
export const WithDifferentSizes = () => (
    <HStack>
        {[115, 55, 50, 44, 32, 8].map((width) => (
            <MissionItem
                key={width}
                width={width}
                arrivalVertiport="BRU"
                departureVertiport="KAR"
                flightNumber="VC199711"
                pilotAssignment="assigned"
                batteryAssignment="assigned"
                isDueSoon
            />
        ))}
    </HStack>
);
