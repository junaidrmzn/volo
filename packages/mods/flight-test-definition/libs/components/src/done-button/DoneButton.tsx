import type { ButtonProps } from "@volocopter/design-library-react";
import { Button, Icon } from "@volocopter/design-library-react";
import { useDoneButtonTranslation } from "./translations/useDoneButtonTranslation";

export type DoneButtonProps = ButtonProps;

export const DoneButton = (props: DoneButtonProps) => {
    const { t } = useDoneButtonTranslation();

    return (
        <Button {...props} leftIcon={<Icon icon="check" />} variant="primary">
            {t("Done")}
        </Button>
    );
};
