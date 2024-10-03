import type { Meta, StoryFn } from "@storybook/react";
import { Center, HStack, VStack } from "@volocopter/design-library-react";
import { useLayoutEffect } from "react";
import { v4 } from "uuid";
import type { FormValues } from "@voloiq/form";
import { object, textarea } from "@voloiq/form";
import { I18nProvider } from "@voloiq/i18n";
import { TextWithLabel } from "@voloiq/text-layouts";
import type { BulkResourceSectionProps } from "./BulkResourceSection";
import { BulkResourceSection } from "./BulkResourceSection";

const procedureSchema = object({
    objectives: textarea().required().label("Objectives"),
    prerequisites: textarea().required().label("Prerequisites"),
    passOrFailCriteria: textarea().required().label("Pass/Fail Criteria"),
});
type ProcedureSchema = typeof procedureSchema;
type Procedure = FormValues<ProcedureSchema> & { id: string };

const anyProcedure: Procedure = {
    id: "b4509403-0706-4bd7-aae5-2521f52a634d",
    objectives:
        "Verify that the FCS can recover from a single/dual motor failure and that the pilot can continue flight at the original flight condition in hover conditions (0 groundspeed).",
    prerequisites:
        "• The motor failures may result in temporary changes in pitch, roll, heading, height and of course their respective derivatives before the FCS is able to recover due to delays in aerodynamic response. Flight envelope must therefore have been cleared with some margin to allow for the failure conditions.",
    passOrFailCriteria:
        "• The FCS compensates for the failed motor(s) with minimal pilot intervention. The transient must not be objectionable (notionally <1sec to start of recovery).",
};

let procedures: Procedure[] = [];

const props: BulkResourceSectionProps<ProcedureSchema, Procedure[]> = {
    formSchema: procedureSchema,
    resourceNameSingular: "Procedure",
    resourceNamePlural: "Procedures",
    renderResources: (procedures) => (
        <VStack alignItems="stretch">
            {procedures.map((procedure) => (
                <HStack key={procedure.id} borderRadius="sm" backgroundColor="mono500Gray750" p={3}>
                    <TextWithLabel label="Objectives" text={procedure.objectives} />
                    <TextWithLabel label="Prerequisites" text={procedure.prerequisites} />
                    <TextWithLabel label="Pass/Fail Criteria" text={procedure.passOrFailCriteria} />
                </HStack>
            ))}
        </VStack>
    ),
    renderFormControlGroup: (FormControl) => (
        <VStack>
            <FormControl fieldName="objectives" />
            <FormControl fieldName="prerequisites" />
            <FormControl fieldName="passOrFailCriteria" />
        </VStack>
    ),
    getAllResources: async () => procedures,
    onBulkAdd: async (addedProcedures) => {
        procedures.push(...addedProcedures.map((procedure) => ({ ...procedure, id: v4() })));
    },
    onBulkEdit: async (editedProcedures) => {
        procedures = procedures.map((procedure) => {
            const editedProcedure = editedProcedures.find((editedProcedure) => editedProcedure.id === procedure.id);
            return editedProcedure ?? procedure;
        });
    },
    onBulkDelete: async (deletedProcedureIds) => {
        procedures = procedures.filter((procedure) => !deletedProcedureIds.includes(procedure.id));
    },
    // this can be used in case the form values have a different structure than the DTO
    // (e.g., if you have a select box you'd have a { label: string, value: string } in the form but just a string in the DTO )
    // if that's not the case, it's just the identity function
    getInitialValues: (procedures) => procedures,
};

const meta: Meta = {
    title: "Flight Test Definition/Components/Resource Section",
    component: BulkResourceSection,
    args: props,
    decorators: [
        (Story) => (
            <I18nProvider>
                <Story />
            </I18nProvider>
        ),
    ],
};
export default meta;

export const WithoutInitialValues: StoryFn<BulkResourceSectionProps<ProcedureSchema, Procedure[]>> = (props) => {
    useLayoutEffect(() => {
        procedures = [];
    }, []);
    return <BulkResourceSection {...props} />;
};

export const WithInitialValues: StoryFn<BulkResourceSectionProps<ProcedureSchema, Procedure[]>> = (props) => {
    useLayoutEffect(() => {
        procedures = [anyProcedure];
    }, []);
    return <BulkResourceSection {...props} />;
};

export const WithDisabledCreation: StoryFn<BulkResourceSectionProps<ProcedureSchema, Procedure[]>> = (props) => {
    useLayoutEffect(() => {
        procedures = [];
    }, []);
    return <BulkResourceSection {...props} />;
};
WithDisabledCreation.args = {
    isCreationDisabled: true,
    renderDisabledCreationExplanation: () => (
        <Center borderRadius="sm" backgroundColor="mono500Gray750" p={3}>
            You need to create at least one test point parameters before creating a procedure.
        </Center>
    ),
};
