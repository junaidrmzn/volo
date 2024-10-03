import { useMemo } from "react";
import type { Parameter } from "@voloiq/flight-test-definition-api/v1";

type UseFtiWorkgroupOptions<FtiParameterObject extends {}> = {
    ftiParameterList: FtiParameterObject[];
};
export const useFtiWorkgroups = <FtiParameterObject extends { ftiParameter: Parameter }>(
    options: UseFtiWorkgroupOptions<FtiParameterObject>
) => {
    const { ftiParameterList } = options;

    const ftiWorkgroups = useMemo(() => {
        const ftiWorkgroups: Record<string, FtiParameterObject[]> = {};
        for (const ftiParameterObject of ftiParameterList) {
            const workgroup = ftiParameterObject.ftiParameter.workgroup.label;
            if (ftiWorkgroups[workgroup] === undefined) {
                ftiWorkgroups[workgroup] = [];
            }
            ftiWorkgroups[workgroup]?.push(ftiParameterObject);
        }
        return Object.entries(ftiWorkgroups);
    }, [ftiParameterList]);

    return { ftiWorkgroups };
};
