import { useEffect, useState } from "react";
import type { FTILink, Parameter } from "@voloiq/flight-test-definition-api/v1";
import { useGetAllFtiParameters } from "@voloiq/flight-test-definition-api/v1";

export type UseFtiLinksOptions = {
    ftiLinks?: FTILink[];
};

type Workgroup = string;
export type ResolvedFtiLink = {
    ftiParameter: Parameter;
    isEssential: boolean;
};
export type FtiParametersPerWorkgroup = [Workgroup, ResolvedFtiLink[]][];

export const getFtiParametersPerWorkgroup = (ftiLinks: FTILink[]) => {
    const ftiParameterPerWorkgroup: Record<
        Workgroup,
        {
            ftiParameter: Parameter;
            isEssential: boolean;
        }[]
    > = {};
    for (const ftiLink of ftiLinks) {
        const { desirability, instrumentationParameter: ftiParameter } = ftiLink;
        if (ftiLink) {
            if (ftiParameterPerWorkgroup[ftiParameter.workgroup.label] === undefined) {
                ftiParameterPerWorkgroup[ftiParameter.workgroup.label] = [];
            }
            ftiParameterPerWorkgroup[ftiParameter.workgroup.label]?.push({
                ftiParameter,
                isEssential: desirability === "ESSENTIAL",
            });
        }
    }

    return Object.entries(ftiParameterPerWorkgroup);
};

export const useFtiParametersPerWorkgroup = (options: UseFtiLinksOptions) => {
    const { ftiLinks } = options;
    const { getAllFtiParameters } = useGetAllFtiParameters();
    const [ftiParametersPerWorkgroup, setFtiParametersPerWorkgroup] = useState<FtiParametersPerWorkgroup>([]);

    useEffect(() => {
        if (ftiLinks?.length) {
            setFtiParametersPerWorkgroup(getFtiParametersPerWorkgroup(ftiLinks));
        } else {
            setFtiParametersPerWorkgroup([]);
        }
    }, [ftiLinks, getAllFtiParameters]);

    return { ftiParametersPerWorkgroup };
};
