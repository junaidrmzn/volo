import { useMemo } from "react";
import { StringSchema, bool, number, object, string } from "@voloiq/form";
import { TestPointParameterDescription } from "../filterTestPointParameters";
import { useTestPointsTabContentTranslation } from "./translations/useTestPointsTabContentTranslation";

export const testPointParameterFormFieldPrefix = "testPointParameter-";

export type UseTestPointTabContentFormSchema = {
    testPointParameters?: TestPointParameterDescription[];
};

export const useTestPointTabContentFormSchema = (props: UseTestPointTabContentFormSchema) => {
    const { testPointParameters = [] } = props;
    const { t } = useTestPointsTabContentTranslation();

    return useMemo(() => {
        const basicSchema = {
            sequenceIndex: number().label(t("No.")),
            procedureTitle: string().label(t("Procedure")),
            testPointId: string().label(t("Test Point ID")),
            notes: string().label(t("Notes")),
            isManual: bool().required(),
        };

        type TestPointParameterSchemaShape = Record<
            `${typeof testPointParameterFormFieldPrefix}${string}-${string}`,
            StringSchema
        >;
        const testPointParameterSchema: TestPointParameterSchemaShape = {};
        for (const testPointParameter of testPointParameters) {
            testPointParameterSchema[
                `${testPointParameterFormFieldPrefix}${testPointParameter.id}-${testPointParameter.name}`
            ] = string().label(testPointParameter.name);
        }

        return {
            formSchema: object<TestPointParameterSchemaShape & typeof basicSchema>({
                ...basicSchema,
                ...testPointParameterSchema,
            }),
        };
    }, [t, testPointParameters]);
};

export type TestPointsTabContentFormSchema = ReturnType<typeof useTestPointTabContentFormSchema>["formSchema"];
