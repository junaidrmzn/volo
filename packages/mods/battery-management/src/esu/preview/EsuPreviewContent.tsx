import { Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import type { Esu } from "@voloiq-typescript-api/battery-management-types";
import { useNavigate } from "@voloiq/routing";
import { useDeleteEsu } from "../../api-hooks/useEsuService";
import { DetailItem, OverviewDeleteModal, ResourcePreviewLayout } from "../../components";
import { useDateTimeFormatter } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type EsuPreviewContentProps = {
    esu: Esu;
    refetch: () => void;
};

export const EsuPreviewContent = (props: EsuPreviewContentProps) => {
    const { esu, refetch } = props;
    const navigation = useNavigate();
    const { t } = useResourcesTranslation();
    const { formatToShortDateTime } = useDateTimeFormatter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { sendRequestById: sendDeleteRequest } = useDeleteEsu();
    const validFrom = formatToShortDateTime(esu.validFrom);
    const validTo = esu.validTo ? formatToShortDateTime(esu.validTo) : "-";
    const battery = esu.battery ? esu.battery.name : "-";
    const esuType = esu.type ? esu.type.name : "-";
    const location = esu.location ? esu.location.name : "-";
    const chargingProfile = esu.chargingProfile ? esu.chargingProfile.name : "-";

    const actionButtons = (
        <>
            <Button
                variant="ghost"
                leftIcon={<Icon icon="edit" />}
                onClick={() => {
                    navigation(`edit/${esu.id}`);
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
        <ResourcePreviewLayout title={esu.name} actionButtons={actionButtons}>
            <VStack alignItems="flex-start" wordBreak="break-all" width="100%">
                <DetailItem label={t("esu.model.validFrom")} value={validFrom} />
                <DetailItem label={t("esu.model.validTo")} value={validTo} />
                <DetailItem label={t("esu.model.status")} value={esu.status} />
                <DetailItem label={t("esu.model.technicalStatus")} value={esu.technicalStatus} />
                <DetailItem label={t("esu.model.manufacturer")} value={esu.manufacturer} />
                <DetailItem label={t("esu.model.batch")} value={esu.batch} />
                <DetailItem label={t("esu.model.serial")} value={esu.serial} />
                <DetailItem label={t("esu.model.weight")} value={esu.weight?.toString()} />
                <DetailItem label={t("esu.model.chargingCycles")} value={esu.chargingCycles?.toString()} />
                <DetailItem label={t("esu.model.usageCycles")} value={esu.usageCycles?.toString()} />
                <DetailItem label={t("esu.model.position")} value={esu.position} />
                <DetailItem label={t("esu.model.flightPermits")} value={esu.flightPermits} />
                <DetailItem label={t("esu.model.battery")} value={battery} />
                <DetailItem label={t("esu.model.type")} value={esuType} />
                <DetailItem label={t("esu.model.location")} value={location} />
                <DetailItem label={t("esu.model.chargingProfile")} value={chargingProfile} />
            </VStack>
            <OverviewDeleteModal
                id={esu.id}
                deleteFunction={sendDeleteRequest}
                entityName={esu.name}
                onClose={onClose}
                isOpen={isOpen}
                refetch={refetch}
            />
        </ResourcePreviewLayout>
    );
};
