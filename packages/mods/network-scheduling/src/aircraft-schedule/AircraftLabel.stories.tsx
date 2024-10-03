import type { Meta, StoryFn } from "@storybook/react";
import { Box } from "@volocopter/design-library-react";
import { CrewConfiguration, Service, TechnicalStatus } from "@voloiq-typescript-api/aircraft-management-types";
import { I18nProvider } from "@voloiq/i18n";
import type { AircraftLabelProps } from "./AircraftLabel";
import { AircraftLabel } from "./AircraftLabel";

const meta: Meta = {
    title: "Network Schedule Planning/Aircraft Label",
    component: AircraftLabel,
    decorators: [
        (Story) => (
            <I18nProvider>
                <Box width="280px" background="gray.100">
                    <Story />
                </Box>
            </I18nProvider>
        ),
    ],
};
export default meta;

export const Basic: StoryFn<AircraftLabelProps> = (props) => <AircraftLabel {...props} />;
Basic.args = {
    aircraft: {
        aircraftId: "134234",
        aircraftTypeName: "VD-150",
        crewConfiguration: CrewConfiguration.CREWED,
        technicalStatus: TechnicalStatus.SERVICEABLE,
        homebaseName: "BRU",
        msn: "001",
        registration: "VC-001",
        services: [Service.PASSENGER],
    },
};
