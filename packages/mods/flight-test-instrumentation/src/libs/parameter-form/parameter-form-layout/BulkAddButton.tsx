import { Button, Icon } from "@volocopter/design-library-react";
import { useAddFormControlGroup } from "@voloiq/form";

export type BulkAddButtonProps = {
    buttonText: string;
};

export const BulkAddButton = (props: BulkAddButtonProps) => {
    const { buttonText } = props;
    const { addFormControlGroup } = useAddFormControlGroup();

    return (
        <Button
            mt={3}
            onClick={() => addFormControlGroup()}
            leftIcon={<Icon icon="plus" size={4} />}
            width="full"
            variant="secondary"
        >
            {buttonText}
        </Button>
    );
};
