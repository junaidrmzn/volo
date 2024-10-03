import { VStack } from "@volocopter/design-library-react";
import { EngineeringTestProcedure } from "@voloiq/flight-test-definition-api/v1";
import { EngineeringTestProcedureListItem } from "./EngineeringTestProcedureListItem";

export type EngineeringTestProcedureListItemProps = {
    engineeringTestProcedures: EngineeringTestProcedure[];
};
export const EngineeringTestProcedureList = (props: EngineeringTestProcedureListItemProps) => {
    const { engineeringTestProcedures } = props;

    return (
        <VStack>
            {engineeringTestProcedures.map((engineeringTestProcedure) => (
                <EngineeringTestProcedureListItem
                    key={engineeringTestProcedure.id}
                    engineeringTestProcedure={engineeringTestProcedure}
                />
            ))}
        </VStack>
    );
};
