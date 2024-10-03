import { Flex, HStack, Text } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { InfoCard, Section } from "@voloiq/network-scheduling-components";
import { useMissionTranslations } from "../../translations/useMissionTranslations";
import { ActionPopover } from "./ground-ops-actions-popover/ActionPopover";

type GeneralInformationProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const GeneralInformation = (props: GeneralInformationProps) => {
    const { mission } = props;
    const { departureVertiportCode, arrivalVertiportCode, assignments } = mission;

    const { t } = useMissionTranslations();

    return (
        <Section
            headerLabel={t("generalInformation")}
            bodyContent={
                <Flex width="100%" gap={3} alignItems="flex-start">
                    <HStack width="50%">
                        <InfoCard
                            headerLabel={t("departureGround")}
                            tagLabel={
                                assignments?.scheduledDepartureStandId || assignments?.scheduledDepartureFatoId
                                    ? t("booked")
                                    : t("noAssignment")
                            }
                            tagType={
                                assignments?.scheduledDepartureStandId || assignments?.scheduledDepartureFatoId
                                    ? "normal"
                                    : "error"
                            }
                            actions={<ActionPopover type="departurePad" {...props} />}
                            bodyContent={
                                <HStack>
                                    <Text fontSize="xs">{departureVertiportCode}</Text>
                                    {assignments?.scheduledDepartureFatoId && (
                                        <>
                                            <Text>•</Text>
                                            <Text fontSize="xs">{assignments?.scheduledDepartureFatoKey}</Text>
                                        </>
                                    )}
                                    {assignments?.scheduledDepartureStandId && (
                                        <>
                                            <Text>•</Text>
                                            <Text fontSize="xs">{assignments?.scheduledDepartureStandKey}</Text>
                                        </>
                                    )}
                                </HStack>
                            }
                        />
                    </HStack>
                    <HStack width="50%">
                        <InfoCard
                            headerLabel={t("arrivalGround")}
                            tagLabel={
                                assignments?.scheduledArrivalStandId || assignments?.scheduledArrivalFatoId
                                    ? t("booked")
                                    : t("noAssignment")
                            }
                            tagType={
                                assignments?.scheduledArrivalStandId || assignments?.scheduledArrivalFatoId
                                    ? "normal"
                                    : "error"
                            }
                            actions={<ActionPopover type="arrivalPad" {...props} />}
                            bodyContent={
                                <HStack>
                                    <Text fontSize="xs">{arrivalVertiportCode}</Text>
                                    {assignments?.scheduledArrivalFatoId && (
                                        <>
                                            <Text>•</Text>
                                            <Text fontSize="xs">{assignments?.scheduledArrivalFatoKey}</Text>
                                        </>
                                    )}

                                    {assignments?.scheduledArrivalStandId && (
                                        <>
                                            <Text>•</Text>
                                            <Text fontSize="xs">{assignments?.scheduledArrivalStandKey}</Text>
                                        </>
                                    )}
                                </HStack>
                            }
                        />
                    </HStack>
                </Flex>
            }
        />
    );
};
