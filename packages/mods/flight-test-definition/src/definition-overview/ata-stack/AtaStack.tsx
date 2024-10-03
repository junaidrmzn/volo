import { VStack } from "@volocopter/design-library-react";
import { FlightTestDefinitionOverviewListResponseBody } from "@voloiq/flight-test-definition-api/v2";
import { AtaStackOverviewGroup } from "@voloiq/flight-test-definition-components";
import { useAtaName } from "@voloiq/flight-test-definition-utils";
import { DefinitionListItem } from "./definition-list-item/DefinitionListItem";
import { useAtaStackTranslation } from "./translations/useAtaStackTranslation";

export type AtaStackProps = {
    definitionList: FlightTestDefinitionOverviewListResponseBody;
};

export const AtaStack = (props: AtaStackProps) => {
    const { definitionList } = props;
    const { ata, value: definitions } = definitionList;
    const { mapAtaToSystemName } = useAtaName();
    const { t } = useAtaStackTranslation();

    const totalDefinitionsPerStack = definitions.length;

    return (
        <AtaStackOverviewGroup
            groupName={`${t("ATA")} ${ata} - ${mapAtaToSystemName(ata)} (${totalDefinitionsPerStack})`}
        >
            <VStack alignItems="stretch">
                {definitions.map((definition) => (
                    <DefinitionListItem flightTestDefinitionModified={definition} key={definition.id} />
                ))}
            </VStack>
        </AtaStackOverviewGroup>
    );
};
