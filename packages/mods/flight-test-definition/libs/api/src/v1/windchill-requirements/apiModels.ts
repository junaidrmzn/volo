export type WindchillRequirementPatch = {
    id?: string;
    passOrFailCriteria?: string;
};

export type WindchillRequirement = {
    id: string;
    windchillId: string;
    documentId: string;
    text: string;
    passOrFailCriteria?: string;
};
