import { GridItem, Stack, Text, VStack } from "@volocopter/design-library-react";
import { AltitudeValueWithUnit, TimeValueWithUnit } from "@volocopter/unit-inputs-react";
import { useFormatDateTime } from "@voloiq/dates";
import { PreviewSection, PreviewSectionItem, TextWithLabel } from "@voloiq/text-layouts";
import type { Vertiport } from "@voloiq/vertiport-management-api/v1";
import { useVertiportTranslation } from "../../translations/useVertiportTranslation";
import { PreviewSectionSubheader } from "./PreviewSectionSubheader";

export type VertiportPreviewContentProps = {
    vertiport: Vertiport;
};

export const VertiportPreview = (props: VertiportPreviewContentProps) => {
    const { vertiport } = props;
    const { t } = useVertiportTranslation();
    const { formatDateTime } = useFormatDateTime();
    const validFrom = formatDateTime(vertiport.validFrom);
    const validTo = vertiport.validTo ? formatDateTime(vertiport.validTo) : t("generic.not available");
    const publicFrom = vertiport.publicFrom ? formatDateTime(vertiport.publicFrom) : t("generic.not available");
    const publicTo = vertiport.publicTo ? formatDateTime(vertiport.publicTo) : t("generic.not available");

    return (
        <VStack alignItems="baseline" spacing="3">
            <PreviewSection headerLabel={t("vertiport.overview.general")}>
                <PreviewSectionItem label={t("vertiport.model.validFrom")} text={validFrom} />
                <PreviewSectionItem label={t("vertiport.model.validTo")} text={validTo} />
                <PreviewSectionItem label={t("vertiport.model.publicFrom")} text={publicFrom} />
                <PreviewSectionItem label={t("vertiport.model.publicTo")} text={publicTo} />
                <PreviewSectionItem
                    label={t("vertiport.model.iataCode")}
                    text={vertiport.iataCode ?? t("generic.not available")}
                />
                <PreviewSectionItem
                    label={t("vertiport.model.icaoCode")}
                    text={vertiport.iataCode ?? t("generic.not available")}
                />
                <PreviewSectionItem label={t("vertiport.model.code")} text={vertiport.code} />
                {vertiport.passengerCheckinType && (
                    <PreviewSectionItem
                        label={t("vertiport.model.passengerCheckinType")}
                        text={t(`vertiport.passengerCheckinType.${vertiport.passengerCheckinType}`)}
                    />
                )}
            </PreviewSection>
            <PreviewSection headerLabel={t("vertiport.overview.location")}>
                <PreviewSectionItem label={t("vertiport.model.shortName")} text={vertiport.shortName} />
                <PreviewSectionItem label={t("vertiport.model.regionId")} text={vertiport.region?.name} />
                <PreviewSectionItem label={t("vertiport.model.timeZone")} text={vertiport.timeZone} />

                <PreviewSectionItem
                    label={t("vertiport.model.elevation")}
                    text={<AltitudeValueWithUnit baseUnit="m" displayUnit="m" baseValue={vertiport.elevation} />}
                    fullWidth
                />
                <PreviewSectionItem
                    label={t("vertiport.model.location")}
                    text={`${vertiport.location.latitude.toFixed(3)}, ${vertiport.location.longitude.toFixed(3)}`}
                />
            </PreviewSection>
            <PreviewSection headerLabel={t("vertiport.overview.operationalData")}>
                <PreviewSectionSubheader text={t("vertiport.model.operation")} />
                <PreviewSectionItem
                    label={t("vertiport.model.fatos")}
                    text={vertiport.operation?.fatos?.toString() ?? t("generic.not available")}
                />
                <PreviewSectionItem
                    label={t("vertiport.model.stands")}
                    text={vertiport.operation?.stands?.toString() ?? t("generic.not available")}
                />
                <PreviewSectionSubheader text={t("vertiport.model.MinGroundTimePre")} />
                <PreviewSectionItem
                    label={t("vertiport.model.preFlightBatteryHandling")}
                    text={
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
                <PreviewSectionItem
                    label={t("vertiport.model.preFlightPassengerHandling")}
                    text={
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
                <PreviewSectionItem
                    label={t("vertiport.model.preFlightPilotBriefing")}
                    text={
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
                <PreviewSectionItem
                    label={t("vertiport.model.preFlightAircraftHandling")}
                    text={
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
                <PreviewSectionItem
                    label={t("vertiport.model.fatoBlockingTimePre")}
                    text={
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
                <PreviewSectionSubheader text={t("vertiport.model.MinGroundTimePost")} />
                <PreviewSectionItem
                    label={t("vertiport.model.postFlightBatteryHandling")}
                    text={
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
                <PreviewSectionItem
                    label={t("vertiport.model.postFlightPassengerHandling")}
                    text={
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
                <PreviewSectionItem
                    label={t("vertiport.model.postFlightPilotBriefing")}
                    text={
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
                <PreviewSectionItem
                    label={t("vertiport.model.postFlightAircraftHandling")}
                    text={
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
                <PreviewSectionItem
                    label={t("vertiport.model.fatoBlockingTimePost")}
                    text={
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
                <PreviewSectionSubheader text={t("vertiport.model.serviceHours")} />
                <GridItem gridColumn="unset">
                    <Stack spacing="0">
                        {vertiport.operation?.serviceHours !== undefined &&
                        vertiport.operation?.serviceHours.length > 0 ? (
                            vertiport.operation?.serviceHours.map((day) => (
                                <TextWithLabel
                                    key={day.dayOfWeek}
                                    label={day.dayOfWeek}
                                    text={`opening: ${new Date(0, 0, 0, 0, 0, day.open, 0).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })} 
                                          closing: ${new Date(0, 0, 0, 0, 0, day.close, 0).toLocaleTimeString("en-US", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                          })}`}
                                />
                            ))
                        ) : (
                            <Text size="medium" overflowWrap="anywhere">
                                {t("generic.not available")}
                            </Text>
                        )}
                    </Stack>
                </GridItem>
            </PreviewSection>
            <PreviewSection headerLabel={t("vertiport.model.address")}>
                <PreviewSectionItem label={t("vertiport.model.country")} text={vertiport.address?.country} />
                <PreviewSectionItem label={t("vertiport.model.state")} text={vertiport.address?.state} />
                <PreviewSectionItem label={t("vertiport.model.city")} text={vertiport.address?.city} />
                <PreviewSectionItem label={t("vertiport.model.zipCode")} text={vertiport.address?.zipCode} />
                <PreviewSectionItem label={t("vertiport.model.addressLine1")} text={vertiport.address?.addressLine1} />
                <PreviewSectionItem label={t("vertiport.model.addressLine2")} text={vertiport.address?.addressLine2} />
            </PreviewSection>
            <PreviewSection headerLabel={t("vertiport.overview.marketingData")}>
                <GridItem gridColumn="unset">
                    <Stack spacing="0">
                        <Text size="small" lineHeight="double" fontWeight="bold" color="fontOnBgMuted">
                            {t("vertiport.model.additionalFiles")}
                        </Text>
                        {vertiport.operation?.additionalFiles !== undefined &&
                        vertiport.operation?.additionalFiles.length > 0 ? (
                            vertiport.operation?.additionalFiles.map((name) => (
                                <Text size="medium" overflowWrap="anywhere" key={name.key}>
                                    {`${name.key} / ${name.url} `}
                                </Text>
                            ))
                        ) : (
                            <Text size="medium" overflowWrap="anywhere">
                                {t("generic.not available")}
                            </Text>
                        )}
                    </Stack>
                </GridItem>
                <GridItem gridColumn="unset">
                    <Stack spacing="0">
                        <Text size="small" lineHeight="double" fontWeight="bold" color="fontOnBgMuted">
                            {t("vertiport.model.names")}
                        </Text>
                        {vertiport.names !== undefined && vertiport.names.length > 0 ? (
                            vertiport.names.map((name) => (
                                <Text size="medium" overflowWrap="anywhere" key={name.key}>
                                    {`${name.key} / ${name.value} `}
                                </Text>
                            ))
                        ) : (
                            <Text size="medium" overflowWrap="anywhere">
                                {t("generic.not available")}
                            </Text>
                        )}
                    </Stack>
                </GridItem>
                <GridItem gridColumn="unset">
                    <Stack spacing="0">
                        <Text size="small" lineHeight="double" fontWeight="bold" color="fontOnBgMuted">
                            {t("vertiport.model.images")}
                        </Text>
                        {vertiport.images !== undefined && vertiport.images.length > 0 ? (
                            vertiport.images.map((image) => (
                                <Text size="medium" overflowWrap="anywhere" key={image.key}>
                                    {`${image.key} / ${image.value} `}
                                </Text>
                            ))
                        ) : (
                            <Text size="medium" overflowWrap="anywhere">
                                {t("generic.not available")}
                            </Text>
                        )}
                    </Stack>
                </GridItem>
                <PreviewSectionItem
                    label={t("vertiport.model.popularity")}
                    text={vertiport.popularity.toString() ?? t("generic.not available")}
                />
                <PreviewSectionItem
                    label={t("vertiport.model.dataModelVersion")}
                    text={vertiport.dataModelVersion.toString() ?? t("generic.not available")}
                />
            </PreviewSection>
        </VStack>
    );
};
