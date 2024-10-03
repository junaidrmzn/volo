import { TestPointSequenceTestPointAssociation } from "@voloiq/flight-test-definition-api/v1";
import { DraggableList } from "@voloiq/flight-test-definition-components";
import { ArrayFormControlProvider, BulkFormContext, FormContext, PromiseResults, useBulkForm } from "@voloiq/form";
import { TestPointParameterDescription } from "../filterTestPointParameters";
import { TestPointCardListItem } from "./TestPointCardListItem";
import { TestPointTabContentInitialValues, getInitialFormValues } from "./getInitialFormValues";
import { useTestPointsTabContentTranslation } from "./translations/useTestPointsTabContentTranslation";
import { useEffectIsBulkFormLoading } from "./useEffectIsBulkFormLoading";
import { useReorderFields } from "./useReorderFields";
import { useTestPointSequenceBulkOperations } from "./useTestPointSequenceBulkOperations";
import { useTestPointTabContentFormSchema } from "./useTestPointTabContentFormSchema";

type TestPointsTabContentProps = {
    addBlankRowRef: React.MutableRefObject<Function | undefined>;
    formRef: React.MutableRefObject<HTMLFormElement | null>;
    onAfterSubmit: (results?: PromiseResults) => void;
    setIsBulkFormLoading: (isBulkFormLoading: boolean) => void;
    testPointSequenceId: string;
    testPointAssociations?: TestPointSequenceTestPointAssociation[];
    testPointParameters?: TestPointParameterDescription[];
};

export const TestPointsTabContent = (props: TestPointsTabContentProps) => {
    const {
        addBlankRowRef,
        testPointSequenceId,
        formRef,
        onAfterSubmit,
        testPointAssociations,
        testPointParameters,
        setIsBulkFormLoading,
    } = props;

    const { t } = useTestPointsTabContentTranslation();
    const {
        onBulkDeleteTestPointAssociations,
        onBulkEditTestPointAssociations,
        onBulkAddManualRows,
        isBulkFormLoading,
    } = useTestPointSequenceBulkOperations({ testPointSequenceId });
    const { formSchema } = useTestPointTabContentFormSchema({ testPointParameters });

    const initialValues = getInitialFormValues(testPointAssociations);

    const {
        formData,
        listSchema,
        onSubmit,
        addFormControlGroup,
        removeFormControlGroup,
        getFormFieldValues,
        FormControl,
        fieldArrayData,
    } = useBulkForm({
        onAdd: onBulkAddManualRows,
        onDelete: onBulkDeleteTestPointAssociations,
        onEdit: onBulkEditTestPointAssociations,
        onAfterSubmit,
        schema: formSchema,
        initialValues,
    });

    useEffectIsBulkFormLoading(isBulkFormLoading, setIsBulkFormLoading);

    const { fields, move } = fieldArrayData;
    const { setValue } = formData;

    const addBlankRow = () => {
        const length = formData.getValues().formFields?.length ?? 0;
        const nextSequenceIndex = length + 1;
        addFormControlGroup({ value: { procedureTitle: "", sequenceIndex: nextSequenceIndex, isManual: true } });
    };
    addBlankRowRef.current = addBlankRow;

    const { onDragEnd } = useReorderFields({ fields, setValue, move });

    return (
        <BulkFormContext.Provider value={{ addFormControlGroup, removeFormControlGroup, getFormFieldValues }}>
            <FormContext.Provider value={{ schema: listSchema, formType: "create", ...formData }}>
                <form onSubmit={onSubmit} ref={formRef}>
                    <DraggableList<TestPointTabContentInitialValues>
                        onDragEnd={onDragEnd}
                        // need to that because the types from useBulkForm are not inferring the correct type for items
                        // see useBulkForm hook for details
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        items={fields as TestPointTabContentInitialValues[]}
                        customDragArea
                        ariaLabel={t("Test Points Sequence")}
                        renderListItem={(item, index, onDragElement) => (
                            <ArrayFormControlProvider key={item.id} formControlFieldIndex={index}>
                                <TestPointCardListItem
                                    onDragElement={onDragElement}
                                    FormControl={FormControl}
                                    readOnly={item.readOnly}
                                    testPointParameters={testPointParameters}
                                />
                            </ArrayFormControlProvider>
                        )}
                    />
                </form>
            </FormContext.Provider>
        </BulkFormContext.Provider>
    );
};
