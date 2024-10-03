import { Box, Flex, HStack, SimpleGrid, Spacer } from "@volocopter/design-library-react";
import type { ReactElement, ReactNode } from "react";
import { Children, isValidElement } from "react";
import { AircraftField } from "./AircraftField";
import { DescriptionField } from "./DescriptionField";
import { Field } from "./Field";
import { Header } from "./Header";
import { SubmitButton } from "./SubmitButton";

type ParameterFormLayoutTemplateProps = {
    children: ReactNode;
};

const ParameterFormLayoutTemplate = (props: ParameterFormLayoutTemplateProps) => {
    const { children } = props;

    const validChildren = Children.toArray(children).filter<ReactElement>(isValidElement);
    const header = validChildren.find((child) => child.type === Header);
    const fields = validChildren.filter((child) => child.type === Field);
    const aircraftField = validChildren.find((child) => child.type === AircraftField);
    const descriptionField = validChildren.find((child) => child.type === DescriptionField);
    const submitButton = validChildren.find((child) => child.type === SubmitButton);

    if (fields.length === 0 || !descriptionField) {
        throw new Error("The ParameterFormLayout component must contain a set of fields and one description field.");
    }

    return (
        <>
            {header && (
                <HStack w="full" mb={3} justifyContent="space-between" alignItems="flex-start">
                    {header}
                </HStack>
            )}
            <Box w="full">{aircraftField}</Box>
            <SimpleGrid columns={{ sm: 2, md: 4, lg: 5 }} spacing={3} w="full">
                {fields}
            </SimpleGrid>
            <Box w="full" mt={1.5}>
                {descriptionField}
            </Box>
            {submitButton && (
                <Flex w="full" mt={1.5}>
                    <Spacer />
                    {submitButton}
                </Flex>
            )}
        </>
    );
};

export const ParameterFormLayout = Object.assign(ParameterFormLayoutTemplate, {
    Header,
    AircraftField,
    DescriptionField,
    Field,
    SubmitButton,
});
