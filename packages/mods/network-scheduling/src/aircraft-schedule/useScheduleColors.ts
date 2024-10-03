import { useColorModeValue } from "@volocopter/design-library-react";

export const useScheduleColors = () => {
    const missionBackgroundColor = useColorModeValue("darkBlue.200", "darkBlue.700");
    const eventBackgroundColor = useColorModeValue("gray.200", "darkBlue.100");
    const expandedEventBackgroundColor = useColorModeValue("gray.300", "darkBlue.200");
    const eventBackgroundStripeColor = "rgba(0,0,0,0.05)";
    const warningColor = useColorModeValue("orange.500", "orange.100");

    return {
        missionBackgroundColor,
        eventBackgroundColor,
        eventBackgroundStripeColor,
        expandedEventBackgroundColor,
        warningColor,
    };
};
