import { Button, Icon } from "@volocopter/design-library-react";
import { useAddFormControlGroup } from "@voloiq/form";

export type BulkResourceFormAddGroupButtonProps = {
    buttonText: string;
};

export const BulkResourceFormAddGroupButton = (props: BulkResourceFormAddGroupButtonProps) => {
    const { buttonText } = props;
    const { addFormControlGroup } = useAddFormControlGroup();

    return (
        <Button
            onClick={() => addFormControlGroup()}
            leftIcon={<Icon icon="plus" size={4} />}
            width="full"
            variant="secondary"
        >
            {buttonText}
        </Button>
    );
};
