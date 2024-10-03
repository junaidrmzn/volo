import { ExpandableCard, Icon, IconButton } from "@volocopter/design-library-react";
import { Mission } from "@voloiq/network-schedule-management-api/v1";
import { useNavigate } from "@voloiq/routing";
import { useMissionTranslations } from "../translations/useMissionTranslations";
import { MissionListItemContent } from "./MissionListItemContent";
import { MissionListItemTitle } from "./MissionListItemTitle";

export type MissionListItemProps = {
    mission: Mission;
    onReloadList: () => void;
    onExpandItem: React.Dispatch<React.SetStateAction<string[]>>;
    expandedItems: string[];
};

export const MissionListItem = (props: MissionListItemProps) => {
    const { mission, expandedItems } = props;
    const { t } = useMissionTranslations();
    const { id, flightNumber } = mission;
    const navigate = useNavigate();
    return (
        <ExpandableCard
            cardLabel={t("Mission title", { title: flightNumber })}
            defaultIsExpanded={expandedItems.includes(id)}
        >
            <ExpandableCard.Title>
                <MissionListItemTitle {...props} />
            </ExpandableCard.Title>
            <ExpandableCard.ActionButton>
                <IconButton aria-label={t("buttons.details")} variant="ghost" size="md" onClick={() => navigate(id)}>
                    <Icon icon="chevronRight" size={4} />
                </IconButton>
            </ExpandableCard.ActionButton>
            <ExpandableCard.Content>
                <MissionListItemContent mission={mission} />
            </ExpandableCard.Content>
        </ExpandableCard>
    );
};
