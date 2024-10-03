import { v4 as uuidv4 } from "uuid";
import type { TestPointParameter, TestPointParameterInsert, TestPointParameterResponse } from "./apiModels";

export const anyTestPointParameter = (overwrites?: Partial<TestPointParameter>): TestPointParameter => ({
    id: uuidv4(),
    acronym: "F",
    isActive: true,
    name: "Foo",
    unit: "m",
    createTime: "",
    updateTime: "",
    ...overwrites,
});

export const anyTestPointParameterInsert = (
    overwrites?: Partial<TestPointParameterInsert>
): TestPointParameterInsert => ({
    id: uuidv4(),
    value: "",
    ...overwrites,
});

export const anyTestPointParameterResponse = (
    overwrites?: Partial<TestPointParameterResponse>
): TestPointParameterResponse => ({
    id: uuidv4(),
    value: "",
    name: "Foo",
    unit: "K",
    ...overwrites,
});
