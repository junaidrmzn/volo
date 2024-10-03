import { VStack } from "@volocopter/design-library-react";
import { useGetFlightTestOrderQuery } from "@voloiq/flight-test-definition-api/v1";
import { SectionHeader } from "@voloiq/text-layouts";
import { AssociatedProceduresListItem } from "./AssociatedProceduresListItem";
import { useAssociatedProceduresTranslation } from "./translations/useAssociatedProceduresTranslation";

export type AssociatedProceduresOverviewProps = {
    flightTestOrderId: string;
};

export const AssociatedProceduresOverview = (props: AssociatedProceduresOverviewProps) => {
    const { flightTestOrderId } = props;
    const { flightTestOrder } = useGetFlightTestOrderQuery({
        flightTestOrderId,
    });
    const { t } = useAssociatedProceduresTranslation();

    return (
        <VStack spacing={2} boxSize="full" alignItems="stretch">
            <SectionHeader label={t("Associated Procedures Card")} />
            {flightTestOrder?.associatedProcedures?.map((associatedProcedure, index) => {
                return (
                    <AssociatedProceduresListItem
                        key={`listItem_${associatedProcedure.id}`}
                        cardIndex={index + 1}
                        associatedProcedure={associatedProcedure}
                    />
                );
            })}
        </VStack>
    );
};
