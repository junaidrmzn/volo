import { Box, SimpleGrid } from "@volocopter/design-library-react";
import { Children, ReactElement, ReactNode, isValidElement } from "react";
import { Field } from "./Field";
import { TitleField } from "./TitleField";

type TestHazardAssessmentFormLayoutTemplateProps = {
    children: ReactNode;
};

export const TestHazardAssessmentFormLayoutTemplate = (props: TestHazardAssessmentFormLayoutTemplateProps) => {
    const { children } = props;

    const validChildren = Children.toArray(children).filter<ReactElement>(isValidElement);
    const fields = validChildren.filter((child) => child.type === Field);
    const titleField = validChildren.filter((child) => child.type === TitleField);

    if (fields.length === 0) {
        throw new Error(
            "The TestHazardAssessmentFormLayout component must contain a set of fields and one Hazard Title field."
        );
    }

    return (
        <>
            <Box w="full" mb={1.5}>
                {titleField}
            </Box>
            <SimpleGrid columns={{ sm: 2, md: 2, lg: 2 }} spacing={3} w="full">
                {fields}
            </SimpleGrid>
        </>
    );
};

export const TestHazardAssessmentFormLayout = Object.assign(TestHazardAssessmentFormLayoutTemplate, {
    Field,
    TitleField,
});
