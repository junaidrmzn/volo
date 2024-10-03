import { P, match } from "ts-pattern";
import { useGetAllProcedures } from "@voloiq/flight-test-definition-api/v1";

export type UseProceduresCountOptions = {
    definitionId: string;
};

export const useProceduresCount = (options: UseProceduresCountOptions) => {
    const { definitionId } = options;
    const { pagination } = useGetAllProcedures({ definitionId, manual: false });

    const proceduresCount = match(pagination)
        .with({ totalElements: P.not(P.nullish) }, (pagination) => pagination.totalElements)
        .otherwise(() => undefined);

    return { proceduresCount };
};
