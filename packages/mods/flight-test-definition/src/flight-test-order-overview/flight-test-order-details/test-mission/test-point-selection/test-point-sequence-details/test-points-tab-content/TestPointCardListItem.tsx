import { Box, Icon, IconButton } from "@volocopter/design-library-react";
import type { PointerEvent, ReactElement } from "react";
import { ArrayFormControlProps } from "@voloiq/form";
import { TestPointParameterDescription } from "../filterTestPointParameters";
import { DeleteRowButton } from "./DeleteRowButton";
import { TestPointTabContentFormLayout } from "./TestPointTabContentFormLayout";
import { useTestPointsTabContentTranslation } from "./translations/useTestPointsTabContentTranslation";
import { TestPointsTabContentFormSchema, testPointParameterFormFieldPrefix } from "./useTestPointTabContentFormSchema";

export type TestPointCardListItemProps = {
    FormControl: (props: ArrayFormControlProps<TestPointsTabContentFormSchema>) => ReactElement | null;
    readOnly: boolean;
    testPointParameters?: TestPointParameterDescription[];
    onDragElement: (event: PointerEvent<HTMLDivElement>) => void;
};

export const TestPointCardListItem = (props: TestPointCardListItemProps) => {
    const { FormControl, onDragElement, readOnly, testPointParameters } = props;
    const { t } = useTestPointsTabContentTranslation();

    return (
        <Box pt={3} pb={5} mb={3} background="decorative1Basic" borderRadius="sm" align="flex-start">
            <TestPointTabContentFormLayout>
                <TestPointTabContentFormLayout.Descriptor>
                    <Box onPointerDown={onDragElement} mt="-1" cursor="grab">
                        <IconButton aria-label={t("Drag & Drop")} variant="ghost" size="lg">
                            <Icon icon="ellipsisVertical" />
                        </IconButton>
                    </Box>
                </TestPointTabContentFormLayout.Descriptor>
                <TestPointTabContentFormLayout.SeqFormField>
                    <FormControl isReadOnly showLabel={false} fieldName="sequenceIndex" />
                </TestPointTabContentFormLayout.SeqFormField>
                <TestPointTabContentFormLayout.ProcedureFormField>
                    <FormControl isReadOnly={readOnly} showLabel={false} fieldName="procedureTitle" />
                </TestPointTabContentFormLayout.ProcedureFormField>
                <TestPointTabContentFormLayout.SmallFormFields>
                    {testPointParameters &&
                        testPointParameters.map((testPointParameter) => (
                            <TestPointTabContentFormLayout.SmallFormField key={testPointParameter.id}>
                                <FormControl
                                    isReadOnly={readOnly}
                                    key={testPointParameter.id}
                                    showLabel={false}
                                    fieldName={`${testPointParameterFormFieldPrefix}${testPointParameter.id}-${testPointParameter.name}`}
                                />
                            </TestPointTabContentFormLayout.SmallFormField>
                        ))}
                </TestPointTabContentFormLayout.SmallFormFields>
                <TestPointTabContentFormLayout.TestPointIdFormField>
                    <FormControl isReadOnly={readOnly} showLabel={false} fieldName="testPointId" />
                </TestPointTabContentFormLayout.TestPointIdFormField>
                <TestPointTabContentFormLayout.NotesFormField>
                    <FormControl showLabel={false} fieldName="notes" />
                </TestPointTabContentFormLayout.NotesFormField>
                <TestPointTabContentFormLayout.Actions>
                    <DeleteRowButton mt="-1" />
                </TestPointTabContentFormLayout.Actions>
            </TestPointTabContentFormLayout>
        </Box>
    );
};
