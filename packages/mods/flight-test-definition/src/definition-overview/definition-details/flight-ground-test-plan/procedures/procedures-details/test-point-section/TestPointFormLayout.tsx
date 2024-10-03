import { Box, Grid, HStack, Text } from "@volocopter/design-library-react";
import type { ReactElement, ReactNode } from "react";
import { useSynchronizedScrollElement } from "@voloiq/flight-test-definition-utils";
import { createCompoundComponent } from "@voloiq/utils";

export type TestPointFormLayoutProps = { children: ReactNode };

const { CompoundComponent: Descriptor, getCompoundComponentChildren: getDescriptorChildren } =
    createCompoundComponent();
const { CompoundComponent: SmallFormFields, getCompoundComponentChildren: getSmallFormFieldsChildren } =
    createCompoundComponent();
const { CompoundComponent: SmallFormField, getCompoundComponent: getSmallFormField } = createCompoundComponent();
const { CompoundComponent: LargeFormField, getCompoundComponentChildren: getLargeFormFieldChildren } =
    createCompoundComponent();
const { CompoundComponent: Checkboxes, getCompoundComponentChildren: getCheckboxesChildren } =
    createCompoundComponent();
const { CompoundComponent: Checkbox, getCompoundComponent: getCheckbox } = createCompoundComponent();

const TestPointFormLayoutTemplate = (props: TestPointFormLayoutProps) => {
    const { children } = props;

    const { onScroll, ref } = useSynchronizedScrollElement();

    const descriptor = getDescriptorChildren(children);
    const smallFormFieldsParent = getSmallFormFieldsChildren(children);
    const smallFormFields = getSmallFormField(smallFormFieldsParent).map((child: ReactElement) => child.props.children);
    const largeFormField = getLargeFormFieldChildren(children);
    const checkboxesParent = getCheckboxesChildren(children);
    const checkboxes = getCheckbox(checkboxesParent).map((child: ReactElement) => child.props.children);

    return (
        <HStack spacing={4} width="full" position="relative">
            <Text width={8} fontSize="sm" lineHeight={6}>
                {descriptor}
            </Text>
            <Grid gap={3} boxSize="full" gridTemplateColumns="auto minmax(25%, 1fr) auto">
                <HStack
                    spacing={1}
                    boxSize="full"
                    overflowX="scroll"
                    onScroll={onScroll}
                    ref={ref}
                    alignItems="flex-start"
                >
                    {smallFormFields.map((smallFormField, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Box key={index} minWidth="5.25rem" maxWidth="5.25rem">
                            {smallFormField}
                        </Box>
                    ))}
                </HStack>
                <Box flex={1}>{largeFormField}</Box>
                <HStack spacing={3} alignItems="flex-start">
                    {checkboxes.map((checkbox, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <Box key={index} w={6} textAlign="center">
                            {checkbox}
                        </Box>
                    ))}
                </HStack>
            </Grid>
        </HStack>
    );
};

export const TestPointFormLayout = Object.assign(TestPointFormLayoutTemplate, {
    Descriptor,
    SmallFormFields,
    SmallFormField,
    LargeFormField,
    Checkboxes,
    Checkbox,
});
