import { useQueryClient } from "@tanstack/react-query";
import {
    Button,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    VStack,
} from "@volocopter/design-library-react";
import type { FlightTestCrewPatch } from "@voloiq/flight-test-definition-api/v1";
import { getAllFlightTestCrewQueryKey } from "@voloiq/flight-test-definition-api/v1";
import {
    BulkResourceFormAddGroupButton,
    BulkResourceFormDeleteGroupButton,
} from "@voloiq/flight-test-definition-components";
import { mapSelectOptionToInitialValue } from "@voloiq/flight-test-definition-utils";
import { BulkForm } from "@voloiq/form";
import { ModalHeaderLayout } from "@voloiq/text-layouts";
import { useFlightTestCrewAndOccupantsModalTranslation } from "./translations/useFlightTestCrewAndOccupantsModalTranslation";
import { useFlightTestCrewAndOccupantsFormSchema } from "./useFlightTestCrewAndOccupantsFormSchema";
import { useFlightTestCrewAndOccupantsModal } from "./useFlightTestCrewAndOccupantsModal";

export type FlightTestCrewAndOccupantsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    flightTestOrderId: string;
    flightTestCrewMembers: Partial<FlightTestCrewPatch>[];
};

export const FlightTestCrewAndOccupantsModal = (props: FlightTestCrewAndOccupantsModalProps) => {
    const { flightTestCrewMembers, flightTestOrderId, isOpen, onClose } = props;

    const { t } = useFlightTestCrewAndOccupantsModalTranslation();
    const queryClient = useQueryClient();
    const { formSchema } = useFlightTestCrewAndOccupantsFormSchema();
    const { onBulkAddFlightTestCrew, onBulkDeleteFlightTestCrew, onBulkEditFlightTestCrew } =
        useFlightTestCrewAndOccupantsModal({ flightTestOrderId });

    const handleSubmit = () => {
        queryClient.invalidateQueries(getAllFlightTestCrewQueryKey(flightTestOrderId));
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalHeader>
                    <ModalHeaderLayout modalType={t("Add")} modalTitle={t("Flight Test Crew & Occupants")} />
                </ModalHeader>
                <ModalBody>
                    <BulkForm
                        schema={formSchema}
                        onAdd={onBulkAddFlightTestCrew}
                        onDelete={onBulkDeleteFlightTestCrew}
                        onEdit={onBulkEditFlightTestCrew}
                        initialValues={flightTestCrewMembers.map((flightTestCrewMember) => ({
                            id: flightTestCrewMember.id,
                            role: flightTestCrewMember.role,
                            category: mapSelectOptionToInitialValue(flightTestCrewMember.category),
                            name: flightTestCrewMember.name,
                            position: mapSelectOptionToInitialValue(flightTestCrewMember.position),
                        }))}
                        renderFormControlGroup={(FormControl, index) => (
                            <HStack
                                w="full"
                                p={3}
                                mb={3}
                                background="gray300Gray800"
                                borderRadius="sm"
                                align="flex-end"
                                role="listitem"
                                aria-label={`${t("Flight Test Crew & Occupants modal row")} #${index + 1}`}
                            >
                                <HStack flex={1}>
                                    <FormControl fieldName="role" isNotEditable={index <= 1} />
                                    <FormControl fieldName="category" />
                                    <FormControl fieldName="name" />
                                    <FormControl fieldName="position" />
                                </HStack>
                                {index > 1 && <BulkResourceFormDeleteGroupButton />}
                            </HStack>
                        )}
                        onAfterSubmit={handleSubmit}
                    >
                        <VStack w="full" spacing={3} align="flex-end">
                            <BulkResourceFormAddGroupButton buttonText={t("Add Crew & Occupants")} />
                            <Button type="submit" leftIcon={<Icon icon="check" size={4} />} size="lg" variant="primary">
                                {t("Done")}
                            </Button>
                        </VStack>
                    </BulkForm>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
