import { useMemo } from "react";
import { createFormControl, object, textarea } from "@voloiq/form";
import type { CheckListCategory, MessageInformationCreate } from "@voloiq/network-schedule-management-api/v1";
import { useAddMissionMessage } from "@voloiq/network-schedule-management-api/v1";
import type { MissionTranslationFunction } from "../../../translations/useMissionTranslations";
import { useMissionTranslations } from "../../../translations/useMissionTranslations";

const messageInformationSchemaFactory = (t: MissionTranslationFunction) =>
    object({
        message: textarea({ placeholder: t("messagePlaceholder") })
            .required()
            .label(t("missionMessage")),
    });

type UseMessageInformationFormSchemaProps = {
    missionId: string;
    activeTab: CheckListCategory;
};
export const useMessageInformationFormSchema = (props: UseMessageInformationFormSchemaProps) => {
    const { missionId, activeTab } = props;
    const { t } = useMissionTranslations();
    const formSchema = useMemo(() => messageInformationSchemaFactory(t), [t]);
    const FormControl = createFormControl<typeof formSchema>();
    const { sendRequest } = useAddMissionMessage({ missionId });
    const onCreate = async (formData: { message: string }) => {
        const data: MessageInformationCreate = {
            message: formData.message,
            messageCategory: activeTab,
            userRole: "OCC",
        };

        await sendRequest({ data });
    };

    return { formSchema, FormControl, onCreate };
};
