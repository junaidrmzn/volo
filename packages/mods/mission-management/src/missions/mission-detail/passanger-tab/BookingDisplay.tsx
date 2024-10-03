import { Flex, HStack, Icon, IconButton, Text, VStack } from "@volocopter/design-library-react";
import { MassAndBalanceConfiguration } from "@voloiq-typescript-api/network-scheduling-types";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { InfoCard, Section } from "@voloiq/network-scheduling-components";
import { useNavigate } from "@voloiq/routing";
import { useGetVertiport } from "../../../api-hooks/useNetworkSchedulingService";
import { useErrorToastWithDescription } from "../../hooks/useErrorToast";
import { useMissionTranslations } from "../../translations/useMissionTranslations";

export type BookingDisplayProps = {
    bookingLabel: string;
    passangerWeight?: MassAndBalanceConfiguration[];
    passangerWeightInLimits: string;
    mission: Mission;
    bookingId: string;
};

export const BookingDisplay = (props: BookingDisplayProps) => {
    const { bookingLabel, passangerWeight, passangerWeightInLimits, mission, bookingId } = props;
    const { departureVertiportId } = mission;
    const { t } = useMissionTranslations();
    const navigation = useNavigate();
    const { onError } = useErrorToastWithDescription();
    const { data: vertiportData } = useGetVertiport(departureVertiportId);

    const redirectToBooking = () => {
        if (vertiportData) {
            navigation(`/booking-management/bookings/overview/${vertiportData?.region?.id}+${bookingId}`);
        } else {
            onError(t("booking.error"));
        }
    };

    return (
        <VStack mb={3}>
            <Section
                headerLabel={t("passangerTab.bookings.header")}
                resourceLabel={bookingLabel}
                headerIcon={
                    bookingLabel && (
                        <IconButton
                            variant="ghost"
                            aria-label="externalLink"
                            data-testid="external-resource-button"
                            onClick={() => {
                                redirectToBooking();
                            }}
                        >
                            <Icon icon="externalLink" color="darkBlue.700" />
                        </IconButton>
                    )
                }
                bodyContent={
                    <>
                        <Flex width="100%" gap={3} alignItems="flex-start">
                            <HStack width="100%">
                                <InfoCard
                                    headerLabel={t("passangerTab.bookings.luggage")}
                                    tagLabel={t("passangerTab.status.notChecked")}
                                    tagType="warning"
                                    bodyContent={
                                        <HStack>
                                            <Text fontSize="xs">{t("noAssignment")}</Text>
                                        </HStack>
                                    }
                                />

                                <InfoCard
                                    headerLabel={t("passangerTab.bookings.specialDetails")}
                                    tagLabel={t("passangerTab.status.notChecked")}
                                    tagType="warning"
                                    bodyContent={
                                        <HStack>
                                            <Text fontSize="xs">{t("noAssignment")}</Text>
                                        </HStack>
                                    }
                                />
                            </HStack>
                        </Flex>
                        <Section
                            useInitialSpacing={false}
                            headerLabel={t("passangerTab.passangerInformation.header")}
                            bodyContent={
                                <Flex width="100%" gap={3} alignItems="flex-start">
                                    <HStack width="100%">
                                        <InfoCard
                                            headerLabel={t("passangerTab.passangerInformation.checkIn")}
                                            tagLabel={
                                                passangerWeight && passangerWeight.length > 0
                                                    ? t("passangerTab.status.checked")
                                                    : t("passangerTab.status.notChecked")
                                            }
                                            tagType={
                                                passangerWeight && passangerWeight.length > 0 ? "normal" : "warning"
                                            }
                                            bodyContent={
                                                <HStack>
                                                    <Text fontSize="xs">
                                                        {passangerWeight && passangerWeight.length > 0
                                                            ? t("passangerTab.messages.passangerCheckedIn")
                                                            : t("passangerTab.status.notCheckedIn")}
                                                    </Text>
                                                </HStack>
                                            }
                                        />

                                        <InfoCard
                                            headerLabel={t("passangerTab.passangerInformation.weight")}
                                            tagLabel={
                                                passangerWeightInLimits === "checked"
                                                    ? t("passangerTab.status.checked")
                                                    : t("passangerTab.status.notChecked")
                                            }
                                            tagType={passangerWeightInLimits === "checked" ? "normal" : "warning"}
                                            bodyContent={
                                                <HStack>
                                                    <Text fontSize="xs">
                                                        {passangerWeightInLimits === "checked"
                                                            ? t("passangerTab.messages.weightCalculated")
                                                            : t("passangerTab.status.notCheckedIn")}
                                                    </Text>
                                                </HStack>
                                            }
                                        />

                                        <InfoCard
                                            headerLabel={t("passangerTab.passangerInformation.height")}
                                            tagLabel={
                                                passangerWeight && passangerWeight.length > 0
                                                    ? t("passangerTab.status.checked")
                                                    : t("passangerTab.status.notChecked")
                                            }
                                            tagType={
                                                passangerWeight && passangerWeight.length > 0 ? "normal" : "warning"
                                            }
                                            bodyContent={
                                                <HStack>
                                                    <Text fontSize="xs">
                                                        {passangerWeight && passangerWeight.length > 0
                                                            ? t("passangerTab.messages.heightCalculated")
                                                            : t("passangerTab.status.notCheckedIn")}
                                                    </Text>
                                                </HStack>
                                            }
                                        />
                                    </HStack>
                                </Flex>
                            }
                        />
                    </>
                }
            />
        </VStack>
    );
};
