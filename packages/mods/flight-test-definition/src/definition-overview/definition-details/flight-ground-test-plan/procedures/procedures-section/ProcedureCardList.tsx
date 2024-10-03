import { VStack } from "@volocopter/design-library-react";
import type { ProcedureRead } from "@voloiq/flight-test-definition-api/v1";
import { ProcedureCard } from "./ProcedureCard";

export type ProcedureCardListProps = {
    procedures: ProcedureRead[];
};

export const ProcedureCardList = (props: ProcedureCardListProps) => {
    const { procedures } = props;

    return (
        <VStack alignItems="stretch">
            {procedures.map((procedure, index) => (
                <ProcedureCard key={procedure.id} procedure={procedure} procedureIndex={index + 1} />
            ))}
        </VStack>
    );
};
