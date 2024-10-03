import { useEffect } from "react";
import { useCreateService } from "@voloiq/service";

export type UseReleaseRevisionProps = {
    definitionId: string;
    refetchDefinition?: () => void;
};

export const useReleaseRevision = (props: UseReleaseRevisionProps) => {
    const { definitionId, refetchDefinition } = props;
    const { sendRequest, state } = useCreateService({
        route: `/ftd/v1/definitions/${definitionId}/revisions`,
        options: {
            manual: true,
        },
    });

    useEffect(() => {
        if (state === "success" && refetchDefinition) {
            refetchDefinition();
        }
    }, [refetchDefinition, state]);

    return { sendRequest };
};
