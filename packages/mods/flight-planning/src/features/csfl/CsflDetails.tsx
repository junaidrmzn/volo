import { Box, HStack, Heading, Icon, IconButton, VStack } from "@volocopter/design-library-react";
import { useOutletContext } from "@voloiq/routing";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { useFlightPlanningTranslation } from "../../translations";
import { METERS_TO_FEET } from "../../utils";
import type { CsflDetailsSidebarContext } from "./types";

export const CsflDetails = () => {
    const { selectedSite, closeRightSidebar } = useOutletContext<CsflDetailsSidebarContext>();
    const { t } = useFlightPlanningTranslation();

    if (!selectedSite) return null;

    const altitude = ((selectedSite.alt || 0) * METERS_TO_FEET).toFixed(2);

    return (
        <Box height="100%" p={3}>
            <HStack justifyContent="space-between" mb={4} width="100%">
                <IconButton
                    variant="ghost"
                    aria-label="close"
                    onClick={closeRightSidebar}
                    data-testid="csfl-site-details-close"
                >
                    <Icon icon="close" color="darkBlue.300" />
                </IconButton>
                <Heading size="md" fontWeight="bold">
                    {t("csfl.details.title")}
                </Heading>
                <Box height="36px" width="40px" />
            </HStack>
            <VStack alignItems="baseline" spacing="3">
                <PreviewSection headerLabel={selectedSite.name}>
                    <PreviewSectionItem
                        label={t("flight.waypointAttributes.Latitude")}
                        text={selectedSite.lat?.toFixed(2)}
                    />
                    <PreviewSectionItem
                        label={t("flight.waypointAttributes.Longitude")}
                        text={selectedSite.lng?.toFixed(2)}
                    />
                    <PreviewSectionItem label={t("flight.waypointAttributes.Altitude")} text={altitude} />
                    <PreviewSectionItem label={t("csfl.details.type")} text={selectedSite.type} />
                </PreviewSection>
            </VStack>
        </Box>
    );
};
