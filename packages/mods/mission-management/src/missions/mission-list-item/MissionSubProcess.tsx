import { HStack } from "@volocopter/design-library-react";
import { MissionCreateSource, Service } from "@voloiq-typescript-api/network-scheduling-types";
import type { SubProcess } from "@voloiq-typescript-api/network-scheduling-types";
import { useMissionTranslations } from "../translations/useMissionTranslations";
import { MissionTagGroup } from "./MissionTagGroup";

export type MissionSubProcessProps = {
    subProcess: SubProcess | undefined;
    service: Service;
    isCheckInAllowed: boolean;
    synchronizedWithLeon: boolean;
    source?: MissionCreateSource;
};
export const MissionSubProcess = (props: MissionSubProcessProps) => {
    const { subProcess, service, isCheckInAllowed, synchronizedWithLeon, source } = props;
    const { t } = useMissionTranslations();
    return (
        <HStack spacing={1} mt={3}>
            {subProcess && (
                <>
                    <MissionTagGroup title={t("resourceAssigned")} state={subProcess.resourceAssignmentDone} />
                    {service === Service.PASSENGER &&
                        !synchronizedWithLeon &&
                        source === MissionCreateSource.COMMERCIAL_SCHEDULE && (
                            <MissionTagGroup title={t("airlineAcceptance")} state={subProcess.airlineAcceptanceDone} />
                        )}
                    {service === Service.PASSENGER && (
                        <MissionTagGroup title={t("paxCheckedIn")} state={subProcess.paxCheckedInDone} />
                    )}
                    <MissionTagGroup title={t("flightPlanFiled")} state={subProcess.operationalFlightPlanDone} />
                    <MissionTagGroup
                        title={t("pilotBriefingAcceptance")}
                        state={subProcess.pilotBriefingAcceptanceDone}
                    />
                    {isCheckInAllowed && (
                        <MissionTagGroup title={t("checkInStatus")} state={subProcess.paxCheckedInDone} />
                    )}
                </>
            )}
        </HStack>
    );
};
