import { Text, VStack } from "@volocopter/design-library-react";
import { DirectionValueWithUnit, EnergyValueWithUnit, TimeValueWithUnit } from "@volocopter/unit-inputs-react";
import { useFeatureFlags } from "@voloiq/feature-flags";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { DetailItem } from "../../components";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";

type VertiportDetailGeneralProps = {
    vertiport: Vertiport;
};

export const VertiportDetailTabOperationalData = (props: VertiportDetailGeneralProps) => {
    const { vertiport } = props;
    const { t } = useVertiportTranslation();
    const { isFeatureFlagEnabled } = useFeatureFlags();

    return (
        <VStack>
            <Text size="medium" fontWeight="bold" alignSelf="start">
                {t("vertiport.model.MinGroundTimePre")}
            </Text>
            <DetailItem
                label={t("vertiport.model.preFlightBatteryHandling")}
                value={
                    vertiport.operation?.MinGroundTimePre?.batterySwap ? (
                        <TimeValueWithUnit
                            baseUnit="seconds"
                            displayUnit="minutes"
                            baseValue={vertiport.operation?.MinGroundTimePre?.batterySwap}
                        />
                    ) : (
                        t("generic.not available")
                    )
                }
            />
            <DetailItem
                label={t("vertiport.model.preFlightPassengerHandling")}
                value={
                    vertiport.operation?.MinGroundTimePre?.passengerHandling ? (
                        <TimeValueWithUnit
                            baseUnit="seconds"
                            displayUnit="minutes"
                            baseValue={vertiport.operation?.MinGroundTimePre?.passengerHandling}
                        />
                    ) : (
                        t("generic.not available")
                    )
                }
            />
            <DetailItem
                label={t("vertiport.model.preFlightPilotBriefing")}
                value={
                    vertiport.operation?.MinGroundTimePre?.pilotBriefing ? (
                        <TimeValueWithUnit
                            baseUnit="seconds"
                            displayUnit="minutes"
                            baseValue={vertiport.operation?.MinGroundTimePre?.pilotBriefing}
                        />
                    ) : (
                        t("generic.not available")
                    )
                }
            />
            <DetailItem
                label={t("vertiport.model.preFlightAircraftHandling")}
                value={
                    vertiport.operation?.MinGroundTimePre?.vtolHandling ? (
                        <TimeValueWithUnit
                            baseUnit="seconds"
                            displayUnit="minutes"
                            baseValue={vertiport.operation?.MinGroundTimePre?.vtolHandling}
                        />
                    ) : (
                        t("generic.not available")
                    )
                }
            />
            <DetailItem
                label={t("vertiport.model.fatoBlockingTimePre")}
                value={
                    vertiport.operation?.fatoBlockingTimePre ? (
                        <TimeValueWithUnit
                            baseUnit="seconds"
                            displayUnit="minutes"
                            baseValue={vertiport.operation?.fatoBlockingTimePre}
                        />
                    ) : (
                        t("generic.not available")
                    )
                }
            />
            <Text size="medium" fontWeight="bold" alignSelf="start">
                {t("vertiport.model.MinGroundTimePost")}
            </Text>
            <DetailItem
                label={t("vertiport.model.postFlightBatteryHandling")}
                value={
                    vertiport.operation?.MinGroundTimePost?.batterySwap ? (
                        <TimeValueWithUnit
                            baseUnit="seconds"
                            displayUnit="minutes"
                            baseValue={vertiport.operation?.MinGroundTimePost?.batterySwap}
                        />
                    ) : (
                        t("generic.not available")
                    )
                }
            />
            <DetailItem
                label={t("vertiport.model.postFlightPassengerHandling")}
                value={
                    vertiport.operation?.MinGroundTimePost?.passengerHandling ? (
                        <TimeValueWithUnit
                            baseUnit="seconds"
                            displayUnit="minutes"
                            baseValue={vertiport.operation?.MinGroundTimePost?.passengerHandling}
                        />
                    ) : (
                        t("generic.not available")
                    )
                }
            />
            <DetailItem
                label={t("vertiport.model.postFlightPilotBriefing")}
                value={
                    vertiport.operation?.MinGroundTimePost?.pilotBriefing ? (
                        <TimeValueWithUnit
                            baseUnit="seconds"
                            displayUnit="minutes"
                            baseValue={vertiport.operation?.MinGroundTimePost?.pilotBriefing}
                        />
                    ) : (
                        t("generic.not available")
                    )
                }
            />
            <DetailItem
                label={t("vertiport.model.postFlightAircraftHandling")}
                value={
                    vertiport.operation?.MinGroundTimePost?.vtolHandling ? (
                        <TimeValueWithUnit
                            baseUnit="seconds"
                            displayUnit="minutes"
                            baseValue={vertiport.operation?.MinGroundTimePost?.vtolHandling}
                        />
                    ) : (
                        t("generic.not available")
                    )
                }
            />
            <DetailItem
                label={t("vertiport.model.fatoBlockingTimePost")}
                value={
                    vertiport.operation?.fatoBlockingTimePost ? (
                        <TimeValueWithUnit
                            baseUnit="seconds"
                            displayUnit="minutes"
                            baseValue={vertiport.operation?.fatoBlockingTimePost}
                        />
                    ) : (
                        t("generic.not available")
                    )
                }
            />

            {vertiport.goAroundEnergies && vertiport.goAroundEnergies.length > 0 && (
                <>
                    <Text size="medium" fontWeight="bold" alignSelf="start">
                        {t("vertiport.model.goAroundEnergies")}
                    </Text>
                    {vertiport.goAroundEnergies.map((energy) => (
                        <VStack key={t("vertiport.model.goAroundEnergies")} width="full">
                            <DetailItem
                                label={t("vertiport.model.direction")}
                                value={
                                    <DirectionValueWithUnit
                                        displayUnit="degree"
                                        baseUnit="radian"
                                        baseValue={energy.direction}
                                    />
                                }
                            />
                            <DetailItem
                                label={t("vertiport.model.goAroundEnergy")}
                                value={
                                    <EnergyValueWithUnit
                                        displayUnit="kWh"
                                        baseUnit="kWh"
                                        baseValue={energy.goAroundEnergy}
                                    />
                                }
                            />
                        </VStack>
                    ))}
                </>
            )}

            {isFeatureFlagEnabled("vao-1577") &&
                vertiport.approachDirections &&
                vertiport.approachDirections.length > 0 && (
                    <>
                        <Text size="medium" fontWeight="bold" alignSelf="start">
                            {t("vertiport.model.approachDirections")}
                        </Text>
                        {vertiport.approachDirections.map((approachDirection) => (
                            <VStack key={t("vertiport.model.goAroundEnergies")} width="full">
                                <DetailItem
                                    label={t("vertiport.model.direction")}
                                    value={
                                        <DirectionValueWithUnit
                                            displayUnit="degree"
                                            baseUnit="radian"
                                            baseValue={approachDirection}
                                        />
                                    }
                                />
                            </VStack>
                        ))}
                    </>
                )}
        </VStack>
    );
};
