import { Box, Tag, Tooltip } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useMissionTranslations } from "../translations/useMissionTranslations";

type StatusOfMissionTagProps = {
    mission: Mission;
};

export const StatusOfMissionTag = (props: StatusOfMissionTagProps) => {
    const { mission } = props;
    const { cancellationDescription, statusOfMission } = mission;
    const { t } = useMissionTranslations();

    if (!cancellationDescription) return <Tag colorScheme="blue">{statusOfMission}</Tag>;

    return (
        <Tooltip label={`${t("Reason")}: ${cancellationDescription}`} placement="top">
            <Box>
                <Tag colorScheme="blue">{statusOfMission}</Tag>
            </Box>
        </Tooltip>
    );
};
