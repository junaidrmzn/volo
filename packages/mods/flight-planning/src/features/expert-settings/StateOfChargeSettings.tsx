import {
    Accordion,
    Box,
    Button,
    Flex,
    HStack,
    Heading,
    Icon,
    IconButton,
    VStack,
} from "@volocopter/design-library-react";
import type { RouteEnergySettings } from "@voloiq-typescript-api/flight-planning-types";
import { useIsAuthorizedTo } from "@voloiq/auth";
import { useFeatureFlags } from "@voloiq/feature-flags";
import { FormProvider } from "@voloiq/form";
import { useOutletContext } from "@voloiq/routing";
import { useFlightPlanningTranslation } from "../../translations";
import { convertEnergySettingUnitsForDisplay, convertEnergySettingUnitsToSIUnits } from "../../utils";
import { useSelectedRoute } from "../selected-route";
import type { SocSidebarContext } from "./types";
import { useStateOfChargeSettings } from "./useStateOfChargeSettings";

export const StateOfChargeSettings = () => {
    const { socSettings, selectedRoute, closeRightSidebar } = useOutletContext<SocSidebarContext>();
    const { t: translate } = useFlightPlanningTranslation();
    const { routeOptionId } = useSelectedRoute();
    const {
        FormControl,
        editSocSettingsSchema,
        patchStateOfChargeSettingsAsync,
        isTakeoffMassNotEditable,
        onEditSettingsCallback,
    } = useStateOfChargeSettings({ routeOptionId, routeId: selectedRoute.id });

    const isEnergyEditable = useIsAuthorizedTo(["update"], ["Route"]);
    const isWeatherEditable = useIsAuthorizedTo(["update"], ["Weather"]);
    const canReadWindData = useIsAuthorizedTo(["read"], ["WindData"]);

    const { isFeatureFlagEnabled } = useFeatureFlags();
    const vfp835 = isFeatureFlagEnabled("vfp-835");

    const handleApplyEnergySettings = async (socSettings: RouteEnergySettings) => {
        const editedEnergySettings = convertEnergySettingUnitsToSIUnits(socSettings);
        await patchStateOfChargeSettingsAsync(editedEnergySettings);
        onEditSettingsCallback?.();
    };

    return (
        <Flex flexDirection="column" height="100%" p={3}>
            <HStack justifyContent="space-between" mb={4} width="100%">
                <IconButton
                    variant="ghost"
                    aria-label="close"
                    onClick={closeRightSidebar}
                    data-testid="state-of-charge-settings-close"
                >
                    <Icon icon="close" color="darkBlue.300" />
                </IconButton>
                <Heading size="md" fontWeight="bold">
                    {translate("stateOfCharge.settings.title")}
                </Heading>
                <Box height="36px" width="40px" />
            </HStack>

            <Box width="100%" flexGrow={1} overflowY="auto">
                <Accordion>
                    <FormProvider
                        formId="editSocSettingsSchema"
                        schema={editSocSettingsSchema}
                        formType="edit"
                        initialValues={{ ...convertEnergySettingUnitsForDisplay(socSettings) }}
                        onEdit={handleApplyEnergySettings}
                    >
                        {canReadWindData && (
                            <>
                                <FormControl fieldName="windSpeed" isNotEditable />
                                <FormControl fieldName="windDirection" isNotEditable />
                            </>
                        )}

                        {!vfp835 && !canReadWindData && (
                            <>
                                <FormControl fieldName="windSpeed" />
                                <FormControl fieldName="windDirection" />
                            </>
                        )}

                        <FormControl
                            fieldName="takeoffMass"
                            isNotEditable={(!isEnergyEditable && !isWeatherEditable) || isTakeoffMassNotEditable}
                        />
                        <FormControl
                            fieldName="batteryCycles"
                            isNotEditable={!isEnergyEditable && !isWeatherEditable}
                        />
                        <FormControl fieldName="airDensity" isNotEditable={!isEnergyEditable && !isWeatherEditable} />
                        <FormControl
                            fieldName="ambientTemperature"
                            isNotEditable={!isEnergyEditable && !isWeatherEditable}
                        />
                        <FormControl
                            fieldName="csflEnergyOverhead"
                            isNotEditable={!isEnergyEditable && !isWeatherEditable}
                        />
                        <FormControl
                            fieldName="pdmTwoEfficiencyLoss"
                            isNotEditable={!isEnergyEditable && !isWeatherEditable}
                        />
                        <FormControl
                            fieldName="maxTimeToCsfl"
                            isNotEditable={!isEnergyEditable && !isWeatherEditable}
                        />
                        <FormControl
                            fieldName="discretionaryEnergy"
                            isNotEditable={!isEnergyEditable && !isWeatherEditable}
                        />
                        <FormControl fieldName="extraEnergy" isNotEditable={!isEnergyEditable && !isWeatherEditable} />
                        <FormControl
                            fieldName="additionalEnergy"
                            isNotEditable={!isEnergyEditable && !isWeatherEditable}
                        />
                        <FormControl
                            fieldName="contingencyEnergy"
                            isNotEditable={!isEnergyEditable && !isWeatherEditable}
                        />
                        <FormControl fieldName="goAroundEnergy" isNotEditable />
                        <FormControl
                            fieldName="horizontalObstacleClearance"
                            isNotEditable={!isEnergyEditable && !isWeatherEditable}
                        />
                        <FormControl
                            fieldName="verticalObstacleClearance"
                            isNotEditable={!isEnergyEditable && !isWeatherEditable}
                        />
                        <Box w="100%">
                            <Accordion.Item>
                                <Accordion.Title title={translate("stateOfCharge.settings.taxiSettings")} />
                                <Accordion.Content>
                                    <VStack width="100%" gap={3}>
                                        <FormControl fieldName="departureTaxiSpeed" />
                                        <FormControl fieldName="departureTaxiDistance" />
                                        <FormControl fieldName="arrivalTaxiSpeed" />
                                        <FormControl fieldName="arrivalTaxiDistance" />
                                    </VStack>
                                </Accordion.Content>
                            </Accordion.Item>
                        </Box>
                        <Box w="100%">
                            <Accordion.Item>
                                <Accordion.Title title={translate("stateOfCharge.settings.advancedSettings")} />
                                <Accordion.Content>
                                    <VStack width="100%" gap={3}>
                                        <FormControl fieldName="transitionAltitude" isNotEditable={!isEnergyEditable} />
                                        <FormControl fieldName="airspeedCsfl" isNotEditable={!isEnergyEditable} />
                                        <FormControl fieldName="descendAngleCsfl" isNotEditable={!isEnergyEditable} />
                                        <FormControl fieldName="climbTakeoff" isNotEditable={!isEnergyEditable} />
                                        <FormControl fieldName="climbTouchDown" isNotEditable={!isEnergyEditable} />
                                        <FormControl fieldName="maxClimbRate" isNotEditable={!isEnergyEditable} />
                                        <FormControl fieldName="maxDescendRate" isNotEditable={!isEnergyEditable} />
                                        <FormControl fieldName="loiterAltitude" isNotEditable={!isEnergyEditable} />
                                        <FormControl fieldName="loiterTime" isNotEditable={!isEnergyEditable} />
                                        <FormControl fieldName="loiterTimeCsfl" isNotEditable={!isEnergyEditable} />
                                        <FormControl
                                            fieldName="batteryCapacityOrig"
                                            isNotEditable={!isEnergyEditable}
                                        />
                                        <FormControl fieldName="unusableEnergy" isNotEditable={!isEnergyEditable} />
                                        <FormControl fieldName="finalReserve" isNotEditable={!isEnergyEditable} />
                                        <FormControl
                                            fieldName="integrationTimeStepsSeconds"
                                            isNotEditable={!isEnergyEditable}
                                        />
                                    </VStack>
                                </Accordion.Content>
                            </Accordion.Item>
                        </Box>
                    </FormProvider>
                </Accordion>
            </Box>

            <VStack width="100%" mt={4}>
                <Button
                    width="100%"
                    variant="secondary"
                    onClick={closeRightSidebar}
                    data-testid="state-of-charge-settings-cancel"
                >
                    {translate("common.cancel")}
                </Button>
                {(isEnergyEditable || isWeatherEditable) && (
                    <Button
                        width="100%"
                        form="editSocSettingsSchema"
                        variant="primary"
                        type="submit"
                        data-testid="state-of-charge-settings-apply"
                    >
                        {translate("stateOfCharge.settings.applyButton")}
                    </Button>
                )}
            </VStack>
        </Flex>
    );
};
