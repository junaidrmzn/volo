import { Button, Icon, VStack, useDisclosure } from "@volocopter/design-library-react";
import type { Battery } from "@voloiq-typescript-api/battery-management-types";
import { useNavigate } from "@voloiq/routing";
import { useDeleteBattery } from "../../api-hooks/useBatteryService";
import { DetailItem, OverviewDeleteModal, ResourcePreviewLayout } from "../../components";
import { useDateTimeFormatter } from "../../hooks";
import { useResourcesTranslation } from "../../translations/useResourcesTranslation";

export type BatteryPreviewContentProps = {
    battery: Battery;
    refetch: () => void;
};

export const BatteryPreviewContent = (props: BatteryPreviewContentProps) => {
    const { battery, refetch } = props;
    const navigation = useNavigate();
    const { t } = useResourcesTranslation();
    const { formatToShortDateTime } = useDateTimeFormatter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { sendRequestById: sendDeleteRequest } = useDeleteBattery();
    const validFrom = formatToShortDateTime(battery.validFrom);
    const validTo = battery.validTo ? formatToShortDateTime(battery.validTo) : "-";
    const firstUsageTime = battery.firstUsageTime ? formatToShortDateTime(battery.firstUsageTime) : "-";
    const lastChargeTime = battery.lastChargeTime ? formatToShortDateTime(battery.lastChargeTime) : "-";

    const actionButtons = (
        <>
            <Button
                variant="ghost"
                leftIcon={<Icon icon="edit" />}
                onClick={() => {
                    navigation(`edit/${battery.id}`);
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
        <ResourcePreviewLayout title={battery.name} actionButtons={actionButtons}>
            <VStack alignItems="flex-start" wordBreak="break-all" width="100%">
                <DetailItem label={t("battery.model.validFrom")} value={validFrom} />
                <DetailItem label={t("battery.model.validTo")} value={validTo} />
                <DetailItem label={t("battery.model.actstatus")} value={battery.actStatus} />
                <DetailItem label={t("battery.model.technicalStatus")} value={battery.technicalStatus} />
                <DetailItem label={t("battery.model.firstusagetime")} value={firstUsageTime} />
                <DetailItem label={t("battery.model.flightpermits")} value={battery.flightPermits} />
                <DetailItem label={t("battery.model.batteryid")} value={battery.id.toString()} />
                <DetailItem label={t("battery.model.batterytypeid")} value={battery.batteryType.id.toString()} />
                <DetailItem label={t("battery.model.lastchargetime")} value={lastChargeTime} />
                <DetailItem label={t("battery.model.location")} value={battery.location.name} />
                <DetailItem label={t("battery.model.maxchargingtime")} value={battery.maxChargingTime?.toString()} />
                <DetailItem label={t("battery.model.maxcellvoltage")} value={battery.maxCellVoltage.toString()} />
                <DetailItem label={t("battery.model.mincellvoltage")} value={battery.minCellVoltage.toString()} />
                <DetailItem label={t("battery.model.nrchargingcycles")} value={battery.nrChargingCycles?.toString()} />
                <DetailItem label={t("battery.model.nrusagecycles")} value={battery.nrUsageCycles?.toString()} />
                <DetailItem label={t("battery.model.numberofesus")} value={battery.nrEsu.toString()} />
                <DetailItem label={t("battery.model.weight")} value={battery.weight.toString()} />
            </VStack>
            <OverviewDeleteModal
                id={battery.id}
                deleteFunction={sendDeleteRequest}
                entityName={battery.name}
                onClose={onClose}
                isOpen={isOpen}
                refetch={refetch}
            />
        </ResourcePreviewLayout>
    );
};
