import { Box, HStack, Heading, Icon, IconButton, VStack } from "@volocopter/design-library-react";
import React from "react";
import { Feature, useGetNotamsQuery } from "@voloiq/flight-planning-api/v1";
import { ErrorPage, LoadingSpinner } from "../../components";
import { useFlightPlanningTranslation } from "../../translations/useFlightPlanningTranslation";
import { NotamListItem } from "./NotamListItem";

type NotamListProps = {
    routeOptionId: number | string;
    latitude: number;
    longitude: number;
    closeRightSidebar: () => void;
};

export const NotamList: React.FC<NotamListProps> = (props) => {
    const { routeOptionId, latitude, longitude, closeRightSidebar } = props;
    const {
        isFetching,
        isError,
        query: notamsQueryData,
    } = useGetNotamsQuery({
        routeOptionId,
        latitude,
        longitude,
        isEnabled: !!latitude && !!longitude,
    });
    const { t: translate } = useFlightPlanningTranslation();
    return (
        <VStack align="start" height="100%" width="100%">
            <Box p={3} flexDirection="column" width="100%">
                <HStack justifyContent="space-between" width="100%">
                    <IconButton variant="ghost" aria-label="close" onClick={closeRightSidebar}>
                        <Icon icon="close" color="darkBlue.300" />
                    </IconButton>
                    <Heading size="md" fontWeight="bold">
                        Notams
                    </Heading>
                    <Box height="36px" width="40px" />
                </HStack>
            </Box>
            <Box width="100%" flexGrow={1} overflowY="auto">
                {isError ||
                    (notamsQueryData.isSuccess && !notamsQueryData.data && (
                        <ErrorPage error={translate("notam.error.message")} />
                    ))}
                {isFetching && <LoadingSpinner />}
                {notamsQueryData &&
                    notamsQueryData?.data?.features.map((feature: Feature) => (
                        <NotamListItem
                            notamFeature={feature}
                            key={`notam-list-item-${feature.properties.externalId}`}
                        />
                    ))}
            </Box>
        </VStack>
    );
};
