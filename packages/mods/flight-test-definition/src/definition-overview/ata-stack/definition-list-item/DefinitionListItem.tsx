import { ExpandableCard } from "@volocopter/design-library-react";
import { FlightTestDefinitionOverviewResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { DetailsButton } from "@voloiq/flight-test-definition-components";
import { useNavigate } from "@voloiq/routing";
import { DefinitionListItemContent } from "./DefinitionListItemContent";
import { DefinitionListItemTitle } from "./DefinitionListItemTitle";
import { useDefinitionListItemTranslation } from "./translations/useDefinitionListItemTranslation";

export const getDefinitionRevisionUrl = (definitionId: string, releasedRevisions: string[]) => {
    const revision = releasedRevisions?.at(0);
    return revision ? `${definitionId}/readonly/${revision}?entityType=flightTestDefinition` : definitionId;
};

export type DefinitionListItemProps = {
    flightTestDefinitionModified: FlightTestDefinitionOverviewResponseBody;
};

export const DefinitionListItem = (props: DefinitionListItemProps) => {
    const { flightTestDefinitionModified } = props;
    const { id, ftdId, releasedRevisions } = flightTestDefinitionModified;
    const navigate = useNavigate();
    const { t } = useDefinitionListItemTranslation();
    const url = getDefinitionRevisionUrl(id, releasedRevisions);

    return (
        <ExpandableCard cardLabel={t("FTD _ftdId_", { ftdId })}>
            <ExpandableCard.Title>
                <DefinitionListItemTitle flightTestDefinitionModified={flightTestDefinitionModified} />
            </ExpandableCard.Title>
            <ExpandableCard.ActionButton>
                <DetailsButton onClick={() => navigate(url)} />
            </ExpandableCard.ActionButton>
            <ExpandableCard.Content>
                <DefinitionListItemContent flightTestDefinitionModified={flightTestDefinitionModified} />
            </ExpandableCard.Content>
        </ExpandableCard>
    );
};
