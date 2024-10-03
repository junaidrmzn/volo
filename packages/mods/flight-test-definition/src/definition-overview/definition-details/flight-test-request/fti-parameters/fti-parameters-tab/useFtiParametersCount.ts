import { P, match } from "ts-pattern";
import { useGetAllFtiLinksQuery } from "@voloiq/flight-test-definition-api/v1";

export type UseFtiParametersCountOptions = {
    definitionId: string;
};

export const useFtiParametersCount = (options: UseFtiParametersCountOptions) => {
    const { definitionId } = options;
    const { pagination } = useGetAllFtiLinksQuery({ definitionId, params: { size: 100_000 } });

    const ftiParametersCount = match(pagination)
        .with({ totalElements: P.not(P.nullish) }, (pagination) => pagination.totalElements)
        .otherwise(() => undefined);

    return { ftiParametersCount };
};
