import { Button, Flex } from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import { CheckListCategory } from "@voloiq/network-schedule-management-api/v1";
import { useErrorToastWithMessage } from "../../../hooks/useErrorToast";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";
import { useMessageInformationFormSchema } from "./useMessageInformationFormSchema";

type MessageInformationFormProps = {
    missionId: string;
    onMessageSubmitted: (state: boolean) => void;
    activeTab: CheckListCategory;
};

export const MessageInformationForm = (props: MessageInformationFormProps) => {
    const { missionId, onMessageSubmitted, activeTab } = props;
    const { FormControl, formSchema, onCreate } = useMessageInformationFormSchema({ missionId, activeTab });
    const { t } = useMissionTranslations();
    const { onError } = useErrorToastWithMessage();
    return (
        <FormProvider
            formId="missionMessageInformationForm"
            schema={formSchema}
            initialValues={{ message: "" }}
            formType="create"
            onCreate={async (data, reset) => {
                await onCreate(data)
                    .then((response) => {
                        onMessageSubmitted(true);
                        reset();
                        return response;
                    })
                    .catch((error) => {
                        onError(error);
                    });
            }}
        >
            <FormControl fieldName="message" />
            <Flex justifyContent="flex-end">
                <Button type="submit" form="missionMessageInformationForm" size="sm" variant="primary">
                    {t("buttons.addNote")}
                </Button>
            </Flex>
        </FormProvider>
    );
};
