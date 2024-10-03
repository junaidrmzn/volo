import type { TestPointParameter, TestPointParameterInsert, TestPointParameterResponse } from "./apiModels";

export const anyTestPointParameter = (overwrites?: Partial<TestPointParameter>): TestPointParameter => ({
    id: "e7ad28d3-20c6-4447-8f07-d4071f53a538",
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
    id: "e7ad28d3-20c6-4447-8f07-d4071f53a538",
    value: "",
    ...overwrites,
});

export const anyTestPointParameterResponse = (
    overwrites?: Partial<TestPointParameterResponse>
): TestPointParameterResponse => ({
    id: "e7ad28d3-20c6-4447-8f07-d4071f53a538",
    value: "",
    name: "Foo",
    unit: "K",
    ...overwrites,
});
