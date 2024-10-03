import type { Meta, StoryFn } from "@storybook/react";
import { VStack } from "@volocopter/design-library-react";
import type { FormValues } from "@voloiq/form";
import { object, textarea } from "@voloiq/form";
import { I18nProvider } from "@voloiq/i18n";
import { TextWithLabel } from "@voloiq/text-layouts";
import type { ResourceSectionProps } from "./ResourceSection";
import { ResourceSection } from "./ResourceSection";

const procedureSchema = object({
    objectives: textarea().required().label("Objectives"),
    prerequisites: textarea().required().label("Prerequisites"),
    passOrFailCriteria: textarea().required().label("Pass/Fail Criteria"),
});
type ProcedureSchema = typeof procedureSchema;
type Procedure = FormValues<ProcedureSchema>;

let procedure: Procedure = {
    objectives:
        "Verify that the FCS can recover from a single/dual motor failure and that the pilot can continue flight at the original flight condition in hover conditions (0 groundspeed).",
    prerequisites:
        "• The motor failures may result in temporary changes in pitch, roll, heading, height and of course their respective derivatives before the FCS is able to recover due to delays in aerodynamic response. Flight envelope must therefore have been cleared with some margin to allow for the failure conditions.",
    passOrFailCriteria:
        "• The FCS compensates for the failed motor(s) with minimal pilot intervention. The transient must not be objectionable (notionally <1sec to start of recovery).",
};

const props: ResourceSectionProps<ProcedureSchema, Procedure> = {
    formSchema: procedureSchema,
    resourceNameSingular: "Procedure",
    renderResource: (procedure) => (
        <VStack alignItems="stretch">
            <TextWithLabel label="Objectives" text={procedure.objectives} />
            <TextWithLabel label="Prerequisites" text={procedure.prerequisites} />
            <TextWithLabel label="Pass/Fail Criteria" text={procedure.passOrFailCriteria} />
        </VStack>
    ),
    renderFormControls: (FormControl) => (
        <VStack>
            <FormControl fieldName="objectives" />
            <FormControl fieldName="prerequisites" />
            <FormControl fieldName="passOrFailCriteria" />
        </VStack>
    ),
    resource: procedure,
    onEdit: (data) => {
        procedure = data;
    },
    // this can be used in case the form values have a different structure than the DTO
    // (e.g., if you have a select box you'd have a { label: string, value: string } in the form but just a string in the DTO )
    // if that's not the case, it's just the identity function
    getInitialValues: (procedure) => procedure,
};

const meta: Meta = {
    title: "Flight Test Definition/Components/Resource Section",
    component: ResourceSection,
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

export const Basic: StoryFn<ResourceSectionProps<ProcedureSchema, Procedure>> = (props) => (
    <ResourceSection {...props} />
);
