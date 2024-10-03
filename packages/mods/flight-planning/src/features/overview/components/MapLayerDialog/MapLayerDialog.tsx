import {
    Box,
    FormControl,
    HStack,
    Heading,
    Icon,
    IconButton,
    List,
    ListItem,
    Radio,
    RadioGroup,
    Switch,
    Text,
    VStack,
    useColorModeValue,
} from "@volocopter/design-library-react";
import type { ReactElement } from "react";
import { Route } from "@voloiq/flight-planning-api/v1";
import { useFlightPlanningTranslation } from "../../../../translations";
import { CsflSitesToggleButton } from "../CsflSites";

type MapLayerDialogProps = {
    handleClose: () => void;
    handleToggleSatellite: () => void;
    isSatellite: boolean;
    handleShowNotam: () => void;
    showNotam: boolean;
    handleShowCsflSites: () => void;
    showCsflSites: boolean;
    showAirspaces?: boolean;
    toggleAirspaces?: () => void;
    showVfr?: boolean;
    toggleVfr?: () => void;
    selectedRoute?: Route;
    children: ReactElement | ReactElement[];
};
export const MapLayerDialog = (props: MapLayerDialogProps) => {
    const {
        handleClose,
        handleToggleSatellite,
        isSatellite,
        handleShowNotam,
        showNotam,
        handleShowCsflSites,
        showCsflSites,
        toggleAirspaces,
        showAirspaces,
        showVfr,
        toggleVfr,
        selectedRoute,
        children,
    } = props;
    const bgColor = useColorModeValue("white", "gray.900");
    const { t: translate } = useFlightPlanningTranslation();

    return (
        <Box
            flexDirection="column"
            bgColor={bgColor}
            pos="absolute"
            top={28}
            right={24}
            width="300px"
            height="420px"
            alignItems="normal"
            overflow="hidden"
            boxShadow="lg"
            borderRadius="lg"
            data-testid="map-layer-dialog"
        >
            <HStack justifyContent="start" p={3} flex="0 1 auto">
                <IconButton
                    variant="ghost"
                    aria-label="close"
                    onClick={handleClose}
                    data-testid="map-layer-dialog-close-button"
                >
                    <Icon icon="close" color="darkBlue.300" />
                </IconButton>
                <Text data-testid="map-layer-dialog-heading" size="medium" fontWeight="bold">
                    {translate("mapLayerDialog.title")}
                </Text>
            </HStack>
            <VStack alignItems="start" p={3} flex="0 1 auto">
                <Heading size="md" fontWeight="bold">
                    {translate("mapLayerDialog.type")}
                </Heading>
                <RadioGroup value={isSatellite ? "1" : "2"} onChange={handleToggleSatellite} width="100%">
                    <List width="100%">
                        <ListItem>
                            <HStack justifyContent="space-between" flex="0 1 auto">
                                <Text size="small">{translate("mapLayerDialog.satellite")}</Text>
                                <Radio value="1" data-testid="radio-satellite" />
                            </HStack>
                        </ListItem>
                        <ListItem>
                            <HStack justifyContent="space-between" flex="0 1 auto">
                                <Text size="small">{translate("mapLayerDialog.roadmap")}</Text>
                                <Radio value="2" data-testid="radio-roadmap" />
                            </HStack>
                        </ListItem>
                    </List>
                </RadioGroup>
                <Heading size="md" fontWeight="bold">
                    {translate("mapLayerDialog.title")}
                </Heading>
                <List width="100%">
                    <ListItem>
                        <HStack justifyContent="space-between" flex="0 1 auto">
                            <Text size="small">NOTAM</Text>
                            <Box>
                                <FormControl>
                                    <Switch
                                        data-testid="switch-show-notam"
                                        isChecked={showNotam}
                                        onChange={handleShowNotam}
                                    />
                                </FormControl>
                            </Box>
                        </HStack>
                    </ListItem>
                    <ListItem>
                        <HStack justifyContent="space-between" flex="0 1 auto">
                            <Text size="small">{translate("mapLayerDialog.weather")}</Text>
                            <Box>
                                <FormControl>
                                    <Switch />
                                </FormControl>
                            </Box>
                        </HStack>
                    </ListItem>
                    <CsflSitesToggleButton
                        showCsflSites={showCsflSites}
                        handleShowCsflSites={handleShowCsflSites}
                        selectedRoute={selectedRoute}
                    />
                    <ListItem>
                        <HStack justifyContent="space-between" flex="0 1 auto">
                            <Text size="small">Airspaces</Text>
                            <Box>
                                <FormControl>
                                    <Switch
                                        data-testid="switch-show-airspaces"
                                        isChecked={showAirspaces}
                                        onChange={toggleAirspaces}
                                    />
                                </FormControl>
                            </Box>
                        </HStack>
                    </ListItem>
                    <ListItem>
                        <HStack justifyContent="space-between" flex="0 1 auto">
                            <Text size="small">VFR</Text>
                            <Box>
                                <FormControl>
                                    <Switch data-testid="switch-show-vfr" isChecked={showVfr} onChange={toggleVfr} />
                                </FormControl>
                            </Box>
                        </HStack>
                    </ListItem>

                    {children}
                </List>
            </VStack>
        </Box>
    );
};
