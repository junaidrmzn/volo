import { match } from "ts-pattern";
import type { Log } from "@voloiq/logbook-api/v6";
import { CrewMemberRoleEnum } from "@voloiq/logbook-api/v6";
import { PreviewSection, PreviewSectionItem } from "@voloiq/text-layouts";
import { formatUTCDate } from "@voloiq/utils/src";
import { LogEntryStatusTag } from "../../../../libs/logbook/LogEntryStatusTag";
import { transformRemarks } from "../../transformRemarks";
import { useLogDetailsTranslation } from "../../translations/useLogDetailsTranslation";

export type GeneralViewProps = {
    log: Log;
};

export const GeneralView = (props: GeneralViewProps) => {
    const { log } = props;
    const { t } = useLogDetailsTranslation();

    const { aircraft, date, fcSoftware, files, location, crew, remarks, dataState } = log;

    const badgeLabel = match(dataState)
        .with("TM_DATA", () => t("general.generalView.telemetryData"))
        .with("ONBOARD_RECORDED_DATA", () => t("general.generalView.onBoardData"))
        .with("NO_DATA", () => "")
        .otherwise(() => "");

    const badge = dataState !== "NO_DATA" && <LogEntryStatusTag status={dataState} label={badgeLabel} />;

    return (
        <PreviewSection headerLabel={t("general.header")} headerBadge={badge}>
            <PreviewSectionItem
                label={t("general.generalView.aircraftLabel")}
                text={`${aircraft.productLine} - ${aircraft.aircraftType} - ${aircraft.msn}`}
                fullWidth
            />
            <PreviewSectionItem
                label={t("general.generalView.timeOfFlightLabel")}
                text={formatUTCDate(new Date(date))}
                fullWidth
            />
            <PreviewSectionItem label={t("general.generalView.fcSoftwareLabel")} text={fcSoftware} />
            <PreviewSectionItem label={t("general.generalView.locationLabel")} text={location.icaoCode} />
            <PreviewSectionItem
                label={t("general.generalView.crewPilotLabel")}
                text={
                    crew
                        ?.filter((member) => member.role === CrewMemberRoleEnum.PILOT)
                        .map((member) => `${member.firstName} ${member.lastName}`)
                        .join(", ") || undefined
                }
            />
            <PreviewSectionItem
                label={t("general.generalView.crewSupervisorLabel")}
                text={
                    crew
                        ?.filter((member) => member.role === CrewMemberRoleEnum.SUPERVISOR)
                        .map((member) => `${member.firstName} ${member.lastName}`)
                        .join(", ") || undefined
                }
            />
            <PreviewSectionItem label={t("general.generalView.remarksLabel")} text={transformRemarks(remarks)} />
            <PreviewSectionItem label={t("general.generalView.numberOfFiles")} text={files.length.toString()} />
        </PreviewSection>
    );
};
