import { Button, ButtonGroup, FormControl, FormLabel, Input, Popover, VStack } from "@volocopter/design-library-react";
import type { PropsWithChildren } from "react";
import { useFtiParametersEditFormTranslation } from "../translations/useFtiParametersEditFormTranslation";
import { useSaveParameterGroupPopover } from "./useSaveParameterGroupPopover";

export type SaveParameterGroupPopoverProps = {
    onSaveParameterGroup: (name: string) => void;
};
export const SaveParameterGroupPopover = (props: PropsWithChildren<SaveParameterGroupPopoverProps>) => {
    const { children, onSaveParameterGroup } = props;

    const { groupName, setGroupName, isOpen, onOpen, onClose } = useSaveParameterGroupPopover();

    const { t } = useFtiParametersEditFormTranslation();

    return (
        <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
            <Popover.Trigger>{children}</Popover.Trigger>
            <Popover.Content minWidth={64}>
                <VStack alignItems="end">
                    <FormControl>
                        <FormLabel>{t("savePopover.Name")}</FormLabel>
                        <Input type="text" value={groupName} onChange={(event) => setGroupName(event.target.value)} />
                    </FormControl>
                    <ButtonGroup isAttached>
                        <Button variant="secondary" onClick={() => onClose()}>
                            {t("savePopover.Cancel")}
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            onClick={() => {
                                onSaveParameterGroup(groupName);
                                onClose();
                            }}
                            isDisabled={!groupName}
                        >
                            {t("savePopover.Save")}
                        </Button>
                    </ButtonGroup>
                </VStack>
            </Popover.Content>
        </Popover>
    );
};
