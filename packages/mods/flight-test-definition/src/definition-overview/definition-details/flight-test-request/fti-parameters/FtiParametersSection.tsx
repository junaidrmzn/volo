import { Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import { match } from "ts-pattern";
import { useGetAllFtiLinksQuery } from "@voloiq/flight-test-definition-api/v1";
import { EditButton } from "@voloiq/flight-test-definition-components";
import { SectionHeader } from "@voloiq/text-layouts";
import { FtiParameterWorkgroupCardList } from "./FtiParameterWorkgroupCardList";
import { FtiParametersEditModal } from "./FtiParametersEditModal";
import { useFtiParametersTranslation } from "./translations/useFtiParametersTranslation";
import { useFtiParametersPerWorkgroup } from "./useFtiParametersPerWorkgroup";

export type FtiParametersSectionProps = {
    definitionId: string;
};

export const FtiParametersSection = (props: FtiParametersSectionProps) => {
    const { definitionId } = props;
    const { t } = useFtiParametersTranslation();
    const { isOpen: isEditModalOpen, onClose: onCloseEditModal, onOpen: onOpenEditModal } = useDisclosure();
    const { ftiLinks } = useGetAllFtiLinksQuery({ definitionId, params: { size: 100_000 } });
    const { ftiParametersPerWorkgroup } = useFtiParametersPerWorkgroup({ ftiLinks });

    return (
        <>
            <VStack spacing={6} boxSize="full" alignItems="stretch">
                <SectionHeader label={t("FTI Parameters")}>
                    <EditButton resourceName={t("FTI Parameters")} onClick={onOpenEditModal} />
                </SectionHeader>
                {match(ftiParametersPerWorkgroup)
                    .when(
                        (ftiParametersPerWorkgroup) => ftiParametersPerWorkgroup.length === 0,
                        () => (
                            <Button leftIcon={<Icon icon="edit" size={4} />} width="full" onClick={onOpenEditModal}>
                                {t("Edit FTI Parameters")}
                            </Button>
                        )
                    )
                    .otherwise(() => (
                        <FtiParameterWorkgroupCardList ftiParameterPerWorkgroup={ftiParametersPerWorkgroup} />
                    ))}
            </VStack>
            {isEditModalOpen && (
                <FtiParametersEditModal
                    ftiLinks={ftiLinks}
                    onClose={onCloseEditModal}
                    isOpen={isEditModalOpen}
                    definitionId={definitionId}
                />
            )}
        </>
    );
};
