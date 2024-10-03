export type ApplicableRequirementAllOfSource = "MANUAL" | "WINDCHILL";

export type ApplicableRequirement = {
    id: string;
    applicable: boolean;
    title: string;
    content: string;
    passOrFailCriteria: string;
    procedureId: string;
    source: ApplicableRequirementAllOfSource;
};

export type ApplicableRequirementInsert = {
    id: string;
    applicable: boolean;
};
