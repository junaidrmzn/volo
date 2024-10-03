import { v4 as uuidV4 } from "uuid";
import type { ParameterGroup, ParameterGroupInsert, ParameterGroupMapping } from "./apiModels";

export const anyParameterGroupMapping = (overwrites?: Partial<ParameterGroupMapping>): ParameterGroupMapping => ({
    essential: true,
    parameterId: uuidV4(),
    ...overwrites,
});
export const anyParameterGroup = (overwrites?: Partial<ParameterGroup>): ParameterGroup => ({
    id: uuidV4(),
    createTime: new Date().toISOString(),
    updateTime: new Date().toISOString(),
    name: "Test ParameterGroup",
    parameterGroupMapping: [anyParameterGroupMapping()],
    ...overwrites,
});

export const anyParameterGroupInsert = (overwrites?: Partial<ParameterGroupInsert>): ParameterGroupInsert => ({
    name: "anyParameterGroupInsert",
    parameterGroupMapping: [anyParameterGroupMapping()],
    ...overwrites,
});
