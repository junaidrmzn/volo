import { Box, Grid, HStack } from "@volocopter/design-library-react";
import type { ReactElement, ReactNode } from "react";
import { useSynchronizedScrollElement } from "@voloiq/flight-test-definition-utils";
import { createCompoundComponent } from "@voloiq/utils";

export type TestPointTabContentFormTemplateProps = { children: ReactNode };

const { CompoundComponent: Descriptor, getCompoundComponentChildren: getDescriptorChildren } =
    createCompoundComponent();
const { CompoundComponent: SmallFormFields, getCompoundComponentChildren: getSmallFormFieldsChildren } =
    createCompoundComponent();
const { CompoundComponent: SmallFormField, getCompoundComponent: getSmallFormField } = createCompoundComponent();
const { CompoundComponent: ProcedureFormField, getCompoundComponentChildren: getProcedureFormFieldChildren } =
    createCompoundComponent();
const { CompoundComponent: TestPointIdFormField, getCompoundComponentChildren: getTestPointIdFormFieldChildren } =
    createCompoundComponent();
const { CompoundComponent: SeqFormField, getCompoundComponentChildren: getSeqFormFieldChildren } =
    createCompoundComponent();
const { CompoundComponent: NotesFormField, getCompoundComponentChildren: getNotesFormFieldChildren } =
    createCompoundComponent();
const { CompoundComponent: Actions, getCompoundComponentChildren: getActionsChildren } = createCompoundComponent();

const TestPointTabContentFormTemplate = (props: TestPointTabContentFormTemplateProps) => {
    const { children } = props;
    const { onScroll, ref } = useSynchronizedScrollElement();

    const descriptor = getDescriptorChildren(children);
    const smallFormFieldsParent = getSmallFormFieldsChildren(children);
    const smallFormFields = getSmallFormField(smallFormFieldsParent).map((child: ReactElement) => child.props.children);
    const procedureFormField = getProcedureFormFieldChildren(children);
    const testPointIdFormField = getTestPointIdFormFieldChildren(children);
    const notesFormField = getNotesFormFieldChildren(children);
    const seqFormField = getSeqFormFieldChildren(children);
    const actions = getActionsChildren(children);

    return (
        <HStack spacing={4} width="full" alignItems="top" px={2}>
            <Box w={10}>{descriptor}</Box>

            <Grid boxSize="full" gridTemplateColumns="auto 1fr minmax(25%, 1fr) 20% 20%" gap={3} alignItems="top">
                <Box w={18} textAlign="center">
                    {seqFormField}
                </Box>
                <Box>{procedureFormField}</Box>
                <HStack spacing={4} boxSize="full" overflowX="scroll" onScroll={onScroll} ref={ref} alignItems="top">
                    {smallFormFields.map((smallFormField, index) => (
                        <Box
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            minWidth="6.25rem"
                            maxWidth="6.25rem"
                        >
                            {smallFormField}
                        </Box>
                    ))}
                </HStack>
                <Box>{testPointIdFormField}</Box>
                <HStack alignItems="top">
                    <Box flex="1">{notesFormField}</Box>
                    <Box>{actions}</Box>
                </HStack>
            </Grid>
        </HStack>
    );
};

export const TestPointTabContentFormLayout = Object.assign(TestPointTabContentFormTemplate, {
    Descriptor,
    SmallFormFields,
    SmallFormField,
    SeqFormField,
    ProcedureFormField,
    TestPointIdFormField,
    NotesFormField,
    Actions,
});
