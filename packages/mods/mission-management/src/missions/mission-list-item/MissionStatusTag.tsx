import { Tag } from "@volocopter/design-library-react";
import { AircraftTechnicalStatus, StatusOfMission } from "@voloiq-typescript-api/network-scheduling-types";
import { match } from "ts-pattern";
import { MissionConflictType } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../translations/useMissionTranslations";

export type MissionStatusTagProps = {
    statusOfMission: StatusOfMission;
    aircraftTechnicalStatus?: AircraftTechnicalStatus;
    mBStatus?: MissionConflictType[];
};

export const MissionStatusTag = (props: MissionStatusTagProps) => {
    const { statusOfMission, aircraftTechnicalStatus, mBStatus } = props;
    const { t } = useMissionTranslations();

    if (aircraftTechnicalStatus === AircraftTechnicalStatus.UNSERVICEABLE || (mBStatus && mBStatus?.length > 0)) {
        return <Tag colorScheme="error">{t("conflict")}</Tag>;
    }
    return match(statusOfMission)
        .with(StatusOfMission.CANCELLED, () => <Tag colorScheme="error-subtle">{t("mission-status.CANCELLED")}</Tag>)
        .with(StatusOfMission.CLOSED, () => <Tag colorScheme="gray">{t("mission-status.CLOSED")}</Tag>)
        .otherwise(() => null);
};
