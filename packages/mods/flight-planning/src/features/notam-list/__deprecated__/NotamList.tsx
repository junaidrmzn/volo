import { Box, HStack, Heading, Icon, IconButton, VStack } from "@volocopter/design-library-react";
import { useGetNotamsByLatLng } from "@voloiq/flight-planning-api/v1";
import { useParams } from "@voloiq/routing";
import { ErrorPage, LoadingSpinner } from "../../../components";
import { useFlightPlanningTranslation } from "../../../translations/useFlightPlanningTranslation";
import { NotamListItem } from "./NotamListItem";

type NotamListProps = { latitude: number; longitude: number; closeRightSidebar: () => void };

export const NotamList = (props: NotamListProps) => {
    const { routeOptionId } = useParams();
    const { latitude, longitude, closeRightSidebar } = props;
    const notamsQuery = useGetNotamsByLatLng(routeOptionId!, latitude, longitude);
    const { t: translate } = useFlightPlanningTranslation();

    return (
        <VStack align="start" height="100%" width="100%">
            <Box p={3} flexDirection="column" width="100%">
                <HStack justifyContent="space-between" width="100%">
                    <IconButton
                        variant="ghost"
                        aria-label="close"
                        onClick={closeRightSidebar}
                        data-testid="notam-list-close-button"
                    >
                        <Icon icon="close" color="darkBlue.300" />
                    </IconButton>
                    <Heading size="md" fontWeight="bold" data-testid="notam-sidebar-header">
                        Notams
                    </Heading>
                    <Box height="36px" width="40px" />
                </HStack>
            </Box>
            <Box width="100%" flexGrow={1} overflowY="auto">
                {notamsQuery.isError ||
                    (notamsQuery.isSuccess && !notamsQuery.data && (
                        <ErrorPage error={translate("notam.error.message")} />
                    ))}
                {notamsQuery.isLoading && <LoadingSpinner />}
                {notamsQuery.data &&
                    notamsQuery.data.features.map((notam) => (
                        <NotamListItem notamFeature={notam} key={`notam-list-item-${notam.properties.externalId}`} />
                    ))}
            </Box>
        </VStack>
    );
};
