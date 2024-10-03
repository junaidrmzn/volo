import {
    Box,
    Button,
    HStack,
    Heading,
    Icon,
    IconButton,
    Tag,
    Text,
    useColorModeValue,
} from "@volocopter/design-library-react";
import { useGetRouteOptionQuery } from "@voloiq/flight-planning-api/v1";
import { useNavigate } from "@voloiq/routing";
import { useDisplayedRoutes } from "../../features/displayed-routes";
import { useSelectedRoute } from "../../features/selected-route";
import { useFlightPlanningTranslation } from "../../translations";
import { useRoutesTranslation } from "./routes/translations";

export const Header = () => {
    const backgroundColor = useColorModeValue("rgba(255, 255, 255, 1)", "rgba(51, 57, 71, 1)");
    const { routeOptionId, routes } = useDisplayedRoutes();
    const { data: routeOptionQueryData } = useGetRouteOptionQuery({
        routeOptionId,
        isEnabled: !!routeOptionId,
    });
    const { selectedRoute } = useSelectedRoute();
    const navigate = useNavigate();
    const { i18n } = useFlightPlanningTranslation();
    const dateFormatter = new Intl.DateTimeFormat(i18n.language, { dateStyle: "short", timeStyle: "short" });
    const { t } = useRoutesTranslation();

    return (
        <Box top={0} pos="absolute" w="-webkit-fill-available" backgroundColor={backgroundColor} padding="12px">
            <HStack>
                <Box>
                    <IconButton
                        aria-label={t("header.left")}
                        onClick={() => navigate(`../route-options/${routeOptionId}`)}
                        variant="ghost"
                        size="lg"
                        icon={<Icon icon="chevronLeft" />}
                    />
                </Box>
                <Box display="inline-block">
                    <Heading size="xl" paddingRight="12px">
                        <Text fontSize={20} display="inline" fontWeight={600}>
                            Standard Route Options -{" "}
                        </Text>
                        <Text fontSize={20} display="inline">
                            {routeOptionQueryData?.name}
                        </Text>
                        {routeOptionQueryData?.validForOperation ? (
                            <Tag ml="2" fontSize="md" colorScheme="base-subtle">
                                {t("header.status.valid")}
                            </Tag>
                        ) : (
                            <Tag ml="2" fontSize="md" colorScheme="error-subtle">
                                {t("header.status.invalid")}
                            </Tag>
                        )}
                    </Heading>
                    <Box>
                        <Text fontSize={14}>
                            {" "}
                            {routes.length} {t("routeOptions")}{" "}
                        </Text>
                        <Text fontWeight={600} fontSize={14}>
                            {t("header.validFrom")}:
                            {selectedRoute?.validityDate
                                ? dateFormatter.format(new Date(selectedRoute?.validityDate))
                                : ""}
                        </Text>
                    </Box>
                </Box>
                <Box
                    alignItems="right"
                    marginBottom="4"
                    display="flex"
                    padding="var(--spacings-medium, 12px)"
                    borderRadius="6px"
                    pos="absolute"
                    right="0"
                >
                    <Button>
                        <Icon icon="upload" size={4} paddingRight={1} />
                        {t("header.upload")}
                    </Button>
                    <Button ml="2">
                        <Icon icon="download" size={4} paddingRight={1} />
                        {t("header.export")}
                    </Button>
                    <Button ml="2" isDisabled>
                        {t("header.publish")}
                    </Button>
                </Box>
            </HStack>
        </Box>
    );
};
