import { Text, VStack } from "@volocopter/design-library-react";
import { useCrewSchedulerTranslations } from "./translations/useCrewSchedulerTranslations";

export type RestTimeBarProps = {
    restTime: number;
    type: "before" | "after";
};

const restTimeCheck = (restTime: number) => {
    const minRestTime = 12 * 3600;
    if (restTime > minRestTime) return "semanticInfoSubtle";
    return "semanticErrorSubtle";
};

const formatDuration = (duration: number) => {
    const days = Math.floor(duration / (24 * 60 * 60));
    const hours = Math.floor((duration % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    let formattedDuration = "";
    if (days > 0) formattedDuration += `${days}d `;
    if (hours > 0) formattedDuration += `${hours}h `;
    if (minutes > 0) formattedDuration += `${minutes}m`;
    return formattedDuration.trim();
};

export const RestTimeBar = (props: RestTimeBarProps) => {
    const { restTime, type } = props;
    const { t } = useCrewSchedulerTranslations();
    return (
        <VStack
            height={6}
            width="100%"
            justifyContent="center"
            alignItems="stretch"
            mt={type === "before" ? 1 : 0}
            bg={restTimeCheck(restTime)}
            borderRadius="sm"
        >
            <Text width="100%" lineHeight={6} textAlign="center">
                {t("restTime", { time: formatDuration(restTime) })}
            </Text>
        </VStack>
    );
};
