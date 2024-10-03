export type EngineeringTestProcedure = {
    id: string;
    title: string;
    details: string;
};

export type EngineeringTestProcedureInsert = {
    title: string;
    details: string;
};

export type EngineeringTestProcedurePatch = Partial<{
    title: string;
    details: string;
}>;
