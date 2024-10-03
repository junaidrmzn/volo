import { Box, Button, HStack, Text, VStack } from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import { Mission, useCancelMission } from "@voloiq/network-schedule-management-api/v1";
import { useErrorToastWithMessage } from "../../../hooks/useErrorToast";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { useActionsPopover } from "../popover-context/useActionsPopover";
import { CancellationCodeType, useCancelMissionForm } from "./useCancelMissionForm";

export type CancelMissionConfirmationPromptProps = {
    mission: Mission;
    onReloadList: () => void;
};

export const CancelMissionConfirmationPrompt = (props: CancelMissionConfirmationPromptProps) => {
    const { mission, onReloadList } = props;
    const { flightNumber, id: missionId, version } = mission;
    const { sendRequest } = useCancelMission({ missionId });
    const { t } = useMissionTranslations();
    const { onClosePopover } = useActionsPopover();
    const { FormControl, cancelMissionFormSchemaObject } = useCancelMissionForm(t);
    const { onError } = useErrorToastWithMessage();

    return (
        <VStack alignItems="flex-start">
            <Text>{t("Do you really want to cancel mission", { mission: flightNumber })}</Text>
            <Box w="full">
                <FormProvider
                    formId="cancelMission"
                    schema={cancelMissionFormSchemaObject}
                    formType="create"
                    onCreate={(formData: CancellationCodeType) => {
                        sendRequest({
                            data: {
                                cancellationCode: formData.cancellationCode?.value,
                                cancellationDescription: formData.cancellationDescription,
                                version,
                            },
                        })
                            .then(() => {
                                onClosePopover();
                                onReloadList();
                            })
                            .catch((error) => onError(error));
                    }}
                >
                    <FormControl fieldName="cancellationCode" />
                    <FormControl fieldName="cancellationDescription" />
                    <HStack justifyContent="flex-end">
                        <Button size="lg" variant="primary" onClick={() => onClosePopover()}>
                            {t("buttons.no")}
                        </Button>
                        <Button form="cancelMission" type="submit" size="lg" variant="secondary">
                            {t("buttons.yes")}
                        </Button>
                    </HStack>
                </FormProvider>
            </Box>
        </VStack>
    );
};
