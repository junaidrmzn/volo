import { Button, HStack, Text, VStack, useDisclosure, useToast } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useIsAuthorizedTo } from "@voloiq/auth";
import {
    ARV_VERT_CODE_INCONSISTENT,
    ARV_VERT_NOT_FOUND,
    ARV_VERT_NO_PASSENGER_SERVICE,
    ARV_VERT_REGION,
    ARV_VERT_VALID_FROM,
    ARV_VERT_VALID_TO,
    CONNECTION_INCONSISTENT_WRT_DEP_ARV_TIME,
    CONNECTION_INVALID,
    CONNECTION_NOT_FOUND,
    DEP_VERT_CODE_INCONSISTENT,
    DEP_VERT_NOT_FOUND,
    DEP_VERT_NO_PASSENGER_SERVICE,
    DEP_VERT_REGION,
    DEP_VERT_VALID_FROM,
    DEP_VERT_VALID_TO,
    DUPLICATE_VERTIPORTS,
    INVALID_COMM_PLAN_STATUS,
    MULTIPLE_REGIONS,
    Plan,
    VERTIPORT_INVALID,
    VERTIPORT_NOT_FOUND,
    VERTIPORT_NOT_FOUND_FOR_DEP_ARV_TIME,
    usePublishPlan,
} from "@voloiq/commercial-scheduling-api/v1";
import { CommercialSchedulingModal } from "@voloiq/commercial-scheduling-components";
import { AxiosError } from "@voloiq/service";
import { usePlanTranslation } from "../translations/usePlanTranslation";

type PublishPlanModalProps = {
    plan: Plan;
    refetchPlan: () => void;
};

export const PublishPlanModal = (props: PublishPlanModalProps) => {
    const { plan, refetchPlan } = props;
    const { id, status } = plan;
    const isApproved = status === "APPROVED";
    const canPublish = useIsAuthorizedTo(["publish"], ["CommercialPlan"]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { sendRequest } = usePublishPlan(id ?? -1);
    const { t } = usePlanTranslation();
    const toast = useToast();

    const publishPlan = () => {
        if (!isApproved) return;

        const title = t("detail.publishPlan.title");
        sendRequest({})
            .then(() => {
                toast({ title, status: "success", description: t("detail.publishPlan.toast.success.description") });
                refetchPlan();
                onClose();
            })
            .catch((error: AxiosError) => {
                const details = error?.response?.data?.error?.details ?? [];

                for (const detailedError of details) {
                    const key = detailedError?.key ?? "";
                    const value = detailedError?.value ?? "";

                    const description = match(key)
                        .with(CONNECTION_NOT_FOUND, () => t("errorMessages.connectionNotFound", { value }))
                        .with(CONNECTION_INVALID, () => t("errorMessages.connectionInvalid", { value }))
                        .with(CONNECTION_INCONSISTENT_WRT_DEP_ARV_TIME, () => {
                            const [name, x, y] = value.split(", ");
                            return t("errorMessages.connectionInconsistentDepArvTime", { name, x, y });
                        })
                        .with(VERTIPORT_NOT_FOUND_FOR_DEP_ARV_TIME, () =>
                            t("errorMessages.vertiportNotFound", { value })
                        )
                        .with(VERTIPORT_INVALID, () => t("errorMessages.arrivaloffsetDateTimeFormat", { value }))
                        .with(VERTIPORT_NOT_FOUND, () => t("errorMessages.vertiportNotFound", { value }))
                        .with(DUPLICATE_VERTIPORTS, () => t("errorMessages.duplicateVertiport", { value }))
                        .with(MULTIPLE_REGIONS, () => t("errorMessages.multipleRegionVertiports", { value }))
                        .with(INVALID_COMM_PLAN_STATUS, () => t("errorMessages.invalidCommercialPlanStatus", { value }))
                        .with(DEP_VERT_NOT_FOUND, () => "")
                        .with(ARV_VERT_NOT_FOUND, () => "")
                        .with(DEP_VERT_CODE_INCONSISTENT, () => "")
                        .with(ARV_VERT_CODE_INCONSISTENT, () => "")
                        .with(DEP_VERT_REGION, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.unspecifiedVertiportRegion", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(ARV_VERT_REGION, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.unspecifiedVertiportRegion", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(DEP_VERT_VALID_FROM, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.inconsistentDepArrValidFrom", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(DEP_VERT_VALID_TO, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.inconsistentDepArrValidTo", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(ARV_VERT_VALID_FROM, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.inconsistentDepArrValidFrom", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(ARV_VERT_VALID_TO, () => {
                            const [connection, vertiport, x] = value.split(", ");
                            return t("errorMessages.inconsistentDepArrValidTo", {
                                connection,
                                vertiport,
                                x,
                            });
                        })
                        .with(DEP_VERT_NO_PASSENGER_SERVICE, () =>
                            t("errorMessages.departureVertiportNoPassengerService", {
                                id: value,
                            })
                        )
                        .with(ARV_VERT_NO_PASSENGER_SERVICE, () =>
                            t("errorMessages.arrivalVertiportNoPassengerService", {
                                id: value,
                            })
                        )
                        .otherwise(() => t("detail.publishPlan.toast.error.description"));

                    toast({
                        status: "error",
                        title,
                        description,
                    });
                }
            });
    };

    return canPublish ? (
        <>
            <Button variant="primary" onClick={onOpen} isDisabled={!isApproved}>
                {t("detail.publishPlan.title")}
            </Button>
            <CommercialSchedulingModal
                heading={t("detail.publishPlan.modal.heading")}
                subHeading={t("detail.publishPlan.title")}
                size="2xl"
                isOpen={isOpen}
                onClose={onClose}
            >
                <VStack alignItems="flex-start" boxSize="full" spacing={6}>
                    <Text>{t("detail.publishPlan.modal.description")}</Text>
                    <Text color="semanticInfoBasic">{t("detail.publishPlan.modal.note")}</Text>
                    <Text>{t("detail.publishPlan.modal.question")}</Text>
                    <HStack alignSelf="flex-end">
                        <Button onClick={onClose}>{t("generic.cancel")}</Button>
                        <Button variant="primary" onClick={publishPlan}>
                            {t("detail.publishPlan.title")}
                        </Button>
                    </HStack>
                </VStack>
            </CommercialSchedulingModal>
        </>
    ) : null;
};
