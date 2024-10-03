export type Requirement = {
    id: string;
    title: string;
    description: string;
    passOrFailCriteria?: string;
};

export type RequirementInsert = {
    title: string;
    description: string;
    passOrFailCriteria?: string;
};

export type RequirementPatchBulk = {
    id: string;
    title?: string;
};
