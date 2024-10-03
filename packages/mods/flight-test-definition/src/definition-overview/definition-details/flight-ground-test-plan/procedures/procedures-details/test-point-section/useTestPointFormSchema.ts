import { useMemo } from "react";
import type { TestPointParameter } from "@voloiq/flight-test-definition-api/v1";
import type { StringSchema } from "@voloiq/form";
import { boolean, object, string, textarea } from "@voloiq/form";
import { useTestPointSectionTranslation } from "./translations/useTestPointSectionTranslation";

export const testPointParameterFormFieldPrefix = "testPointParameter-";

export type UseTestPointFormSchemaProps = {
    testPointParameters: TestPointParameter[];
};

export const useTestPointFormSchema = (props: UseTestPointFormSchemaProps) => {
    const { testPointParameters } = props;
    const { t } = useTestPointSectionTranslation();

    return useMemo(() => {
        const basicSchema = {
            grossWeight: string().label(t("Gross Weight")),
            centerOfGravity: string().label(t("C.G.")),
            isApplicableForDevelopment: boolean().label(t("Development")),
            isApplicableForCertification: boolean().label(t("Certification")),
            isApplicableForAgency: boolean().label(t("Agency")),
            isApplicableForBuildUp: boolean().label(t("Build Up")),
            isApplicableForUnassigned: boolean().label(t("Unassigned")),
            comments: textarea().label(t("Comments")),
        };

        type TestPointParameterSchemaShape = Record<
            `${typeof testPointParameterFormFieldPrefix}${string}`,
            StringSchema
        >;
        const testPointParameterSchema: TestPointParameterSchemaShape = {};
        for (const testPointParameter of testPointParameters) {
            const { id, name } = testPointParameter;
            testPointParameterSchema[`${testPointParameterFormFieldPrefix}${id}`] = string().label(name);
        }

        return {
            formSchema: object<TestPointParameterSchemaShape & typeof basicSchema>({
                ...basicSchema,
                ...testPointParameterSchema,
            }),
        };
    }, [t, testPointParameters]);
};

export type TestPointsFormSchema = ReturnType<typeof useTestPointFormSchema>["formSchema"];
