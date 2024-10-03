import { Button, Icon } from "@volocopter/design-library-react";
import { useTestPointSequenceDetailsTranslation } from "./translations/useTestPointSequenceDetailsTranslation";

export type AddBlankRowButtonButtonProps = {
    isDisabled: boolean;
    addBlankRowRef: React.MutableRefObject<Function | undefined>;
};

export const AddBlankRowButton = (props: AddBlankRowButtonButtonProps) => {
    const { isDisabled, addBlankRowRef } = props;

    const { t } = useTestPointSequenceDetailsTranslation();

    return (
        <Button
            onClick={() => addBlankRowRef.current?.()}
            variant="ghost"
            leftIcon={<Icon icon="plus" size={4} />}
            isDisabled={isDisabled}
        >
            {t("Add Blank Row")}
        </Button>
    );
};
