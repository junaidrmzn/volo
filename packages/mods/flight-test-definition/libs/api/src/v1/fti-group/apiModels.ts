export type ParameterGroupMapping = {
    essential: boolean;
    parameterId: string;
};

export type ParameterGroup = ParameterGroupInsert & {
    id: string;
    createTime: string;
    updateTime: string;
};

export type ParameterGroupInsert = {
    name: string;
    parameterGroupMapping: ParameterGroupMapping[];
};
