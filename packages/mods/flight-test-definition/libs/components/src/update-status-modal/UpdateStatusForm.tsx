import { FormControl, FormLabel, Select, VStack } from "@volocopter/design-library-react";
import { DoneButton } from "../done-button/DoneButton";
import { useUpdateStatusModalTranslation } from "./translations/useUpdateStatusModalTranslation";
import { useStatusOptions } from "./useStatusOptions";

export type Status = "DRAFT" | "FLIGHT TEST REVIEW" | "ENGINEERING REVIEW" | "TECHNICAL APPROVAL" | "SAFETY APPROVAL";

export type UpdateStatusFormProps = {
    status: Status;
    updateStatus: (status: Status) => Promise<void> | void;
    onAfterStatusUpdate: () => void;
};

export const UpdateStatusForm = (props: UpdateStatusFormProps) => {
    const { status, onAfterStatusUpdate, updateStatus } = props;

    const { t } = useUpdateStatusModalTranslation();
    const { selectOptions, selectedOption, setSelectedOption } = useStatusOptions({ status });

    return (
        <VStack w="full" spacing={3} align="flex-end">
            <FormControl>
                <FormLabel>{t("Status")}</FormLabel>
                <Select
                    size="sm"
                    options={selectOptions}
                    value={selectedOption}
                    onChange={(selectedOption) => {
                        if (selectedOption) setSelectedOption(selectedOption);
                    }}
                />
            </FormControl>
            <DoneButton
                onClick={() => {
                    updateStatus(selectedOption.value);
                    onAfterStatusUpdate();
                }}
            />
        </VStack>
    );
};
