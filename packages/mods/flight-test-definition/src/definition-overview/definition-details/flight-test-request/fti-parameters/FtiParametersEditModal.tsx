import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@volocopter/design-library-react";
import type { FTILink } from "@voloiq/flight-test-definition-api/v1";
import { DoneButton } from "@voloiq/flight-test-definition-components";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { FtiParametersEditForm } from "./fti-parameter-edit-form/FtiParametersEditForm";
import { useFtiParameterEditForm } from "./fti-parameter-edit-form/use-fti-parameter-edit-form/useFtiParameterEditForm";
import { useFtiParametersTranslation } from "./translations/useFtiParametersTranslation";

export type FtiParametersEditModalProps = {
    definitionId: string;
    ftiLinks?: FTILink[];
    isOpen?: boolean;
    onClose: () => void;
};

export const FtiParametersEditModal = (props: FtiParametersEditModalProps) => {
    const { definitionId, ftiLinks, isOpen = false, onClose } = props;

    const { t } = useFtiParametersTranslation();
    const {
        onSubmit,
        onChangeFtiParameterEssentiality,
        onChangeFtiParameterSelection,
        onChangeGroupSelect,
        onDeleteParameterGroup,
        onSaveParameterGroup,
        onSearchInputFieldChange,
        parameterGroups,
        selectableFtiParameters,
        selectedFtiParameters,
        selectedParameterGroup,
    } = useFtiParameterEditForm({ definitionId, ftiLinks });

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("Edit")} modalTitle={t("FTI Parameters")} />
                </ModalHeader>
                <ModalBody>
                    <VStack w="full" spacing={3} align="flex-end">
                        <Flex height="50vh" maxHeight="50vh" overflow="scroll" width="full" alignItems="stretch">
                            <FtiParametersEditForm
                                onChangeFtiParameterEssentiality={onChangeFtiParameterEssentiality}
                                onChangeFtiParameterSelection={onChangeFtiParameterSelection}
                                onChangeGroupSelect={onChangeGroupSelect}
                                onDeleteParameterGroup={onDeleteParameterGroup}
                                onSaveParameterGroup={onSaveParameterGroup}
                                onSearchInputFieldChange={onSearchInputFieldChange}
                                parameterGroups={parameterGroups}
                                selectableFtiParameters={selectableFtiParameters}
                                selectedFtiParameters={selectedFtiParameters}
                                selectedParameterGroup={selectedParameterGroup}
                            />
                        </Flex>
                        <DoneButton
                            onClick={() => {
                                onSubmit().then(() => {
                                    onClose();
                                });
                            }}
                        />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
