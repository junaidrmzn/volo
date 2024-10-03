import { Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import type { EsuType } from "@voloiq-typescript-api/battery-management-types";
import { useNavigate } from "@voloiq/routing";
import { useDeleteEsuType } from "../../api-hooks/useEsuTypeService";
import { DetailItem, OverviewDeleteModal, ResourcePreviewLayout } from "../../components";
import { useDateTimeFormatter } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type EsuTypePreviewContentProps = {
    esuType?: EsuType;
    refetch: () => void;
};

export const EsuTypePreviewContent = (props: EsuTypePreviewContentProps) => {
    const { esuType, refetch } = props;
    const navigation = useNavigate();
    const { t } = useResourcesTranslation();
    const { formatToShortDateTime } = useDateTimeFormatter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { sendRequestById: sendDeleteRequest } = useDeleteEsuType();

    if (!esuType) return null;

    const chargingMode = esuType.manualCharging
        ? t("esu-type.model.chargingMode.manualShort")
        : t("esu-type.model.chargingMode.automaticShort");

    const aircraftTypes = esuType.aircraftTypes.map((aircraftType) => aircraftType.name);
    const validFrom = formatToShortDateTime(esuType.validFrom);
    const validTo = esuType.validTo ? formatToShortDateTime(esuType.validTo) : "-";

    const actionButtons = (
        <>
            <Button
                variant="ghost"
                leftIcon={<Icon icon="edit" />}
                onClick={() => {
                    navigation(`edit/${esuType.id}`);
                }}
            >
                {t("generic.edit button")}
            </Button>
            <Button variant="ghost" leftIcon={<Icon icon="delete" />} onClick={onOpen}>
                {t("generic.delete button")}
            </Button>
        </>
    );

    return (
        <ResourcePreviewLayout title={esuType.name} actionButtons={actionButtons}>
            <VStack alignItems="flex-start" wordBreak="break-all" width="100%">
                <DetailItem label={t("esu-type.model.chargingMode.label")} value={chargingMode} />
                <DetailItem label={t("esu-type.model.aircraftTypes")} value={aircraftTypes} />
                <DetailItem label={t("esu-type.model.validFrom")} value={validFrom} />
                <DetailItem label={t("esu-type.model.validTo")} value={validTo} />
            </VStack>
            <OverviewDeleteModal
                id={esuType.id}
                deleteFunction={sendDeleteRequest}
                entityName="Esu Type"
                onClose={onClose}
                isOpen={isOpen}
                refetch={refetch}
            />
        </ResourcePreviewLayout>
    );
};
