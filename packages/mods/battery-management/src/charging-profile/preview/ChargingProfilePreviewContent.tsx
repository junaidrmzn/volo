import { Button, Heading, Icon, Spacer, VStack, useDisclosure } from "@volocopter/design-library-react";
import type { ChargingProfile } from "@voloiq-typescript-api/battery-management-types";
import { useNavigate } from "@voloiq/routing";
import { useDeleteChargingProfile } from "../../api-hooks/useChargingProfileService";
import { DetailItem, OverviewDeleteModal, ResourcePreviewLayout } from "../../components";
import { useDateTimeFormatter } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type ChargingProfilePreviewContentProps = {
    chargingProfile?: ChargingProfile;
    refetch: () => void;
};

export const ChargingProfilePreviewContent = (props: ChargingProfilePreviewContentProps) => {
    const { chargingProfile, refetch } = props;
    const navigation = useNavigate();
    const { t } = useResourcesTranslation();
    const { formatToShortDateTime } = useDateTimeFormatter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { sendRequestById: sendDeleteRequest } = useDeleteChargingProfile();

    if (!chargingProfile) return null;

    const validFrom = formatToShortDateTime(chargingProfile.validFrom);
    const validTo = chargingProfile.validTo ? formatToShortDateTime(chargingProfile.validTo) : "-";

    const actionButtons = (
        <>
            <Button
                variant="ghost"
                leftIcon={<Icon icon="edit" />}
                onClick={() => {
                    navigation(`edit/${chargingProfile.id}`);
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
        <ResourcePreviewLayout title={chargingProfile.name} actionButtons={actionButtons}>
            <VStack alignItems="flex-start" wordBreak="break-all" width="100%">
                <DetailItem label={t("charging-profile.model.name")} value={chargingProfile.name} />
                <DetailItem label={t("charging-profile.model.validFrom")} value={validFrom} />
                <DetailItem label={t("charging-profile.model.validTo")} value={validTo} />
                <DetailItem label={t("charging-profile.model.chargingType")} value={chargingProfile.chargingType} />
                <DetailItem label={t("charging-profile.model.createTime")} value={chargingProfile.createTime} />
                <DetailItem label={t("charging-profile.model.updateTime")} value={chargingProfile.updateTime} />
                <DetailItem label={t("charging-profile.model.currentCharMax")} value={chargingProfile.currentCharMax} />
                <DetailItem label={t("charging-profile.model.currentCharMin")} value={chargingProfile.currentCharMin} />
                <DetailItem label={t("charging-profile.model.currentDiscMax")} value={chargingProfile.currentDiscMax} />
                <DetailItem label={t("charging-profile.model.currentDiscMin")} value={chargingProfile.currentDiscMin} />
                <DetailItem label={t("charging-profile.model.tempCellHigh")} value={chargingProfile.tempCellHigh} />
                <DetailItem label={t("charging-profile.model.tempCellLow")} value={chargingProfile.tempCellLow} />
                <DetailItem label={t("charging-profile.model.tempCellMax")} value={chargingProfile.tempCellMax} />
                <DetailItem label={t("charging-profile.model.tempCellMin")} value={chargingProfile.tempCellMin} />
                <DetailItem label={t("charging-profile.model.voltageCellBal")} value={chargingProfile.voltageCellBal} />
                <Spacer />
                <Heading size="sm" fontWeight="bold">
                    {t("charging-profile.model.voltageDescriptionFull")}
                </Heading>
                <DetailItem
                    label={t("charging-profile.model.voltageCellHigh")}
                    value={chargingProfile.voltageCellHigh}
                />
                <DetailItem label={t("charging-profile.model.voltageCellLow")} value={chargingProfile.voltageCellLow} />
                <Heading size="sm" fontWeight="bold">
                    {t("charging-profile.model.voltageDescriptionIdle")}
                </Heading>
                <DetailItem label={t("charging-profile.model.voltageCellMax")} value={chargingProfile.voltageCellMax} />
                <DetailItem label={t("charging-profile.model.voltageCellMin")} value={chargingProfile.voltageCellMin} />
            </VStack>
            <OverviewDeleteModal
                id={chargingProfile.id}
                deleteFunction={sendDeleteRequest}
                entityName={chargingProfile.name}
                entityId={chargingProfile.id}
                onClose={onClose}
                isOpen={isOpen}
                refetch={refetch}
            />
        </ResourcePreviewLayout>
    );
};
