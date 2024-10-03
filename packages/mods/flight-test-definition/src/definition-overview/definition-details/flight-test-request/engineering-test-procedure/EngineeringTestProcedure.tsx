import { VStack } from "@volocopter/design-library-react";
import { useGetAllEngineeringTestProcedures } from "@voloiq/flight-test-definition-api/v1";
import { BulkResourceSection } from "@voloiq/flight-test-definition-components";
import { EngineeringTestProcedureList } from "./EngineeringTestProcedureList";
import { useBulkOperationsEngineeringTestProcedure } from "./bulk-form/useBulkOperationsEngineeringTestProcedure";
import { useEngineeringTestProcedureSchema } from "./bulk-form/useEngineeringTestProcedureSchema";
import { useEngineeringTestProceduresTranslation } from "./translations/useEngineeringTestProceduresTranslation";

export type EngineeringTestProcedureProps = {
    definitionId: string;
};

export const EngineeringTestProcedure = (props: EngineeringTestProcedureProps) => {
    const { definitionId } = props;
    const { t } = useEngineeringTestProceduresTranslation();
    const { getAllEngineeringTestProcedures } = useGetAllEngineeringTestProcedures({ definitionId });
    const {
        onBulkAddEngineeringTestProcedures,
        onBulkDeleteEngineeringTestProcedures,
        onBulkEditEngineeringTestProcedures,
    } = useBulkOperationsEngineeringTestProcedure({ definitionId });
    const schema = useEngineeringTestProcedureSchema();

    return (
        <BulkResourceSection
            resourceNamePlural={t("Engineering Test Procedures")}
            resourceNameSingular={t("Engineering Test Procedure")}
            formSchema={schema}
            onBulkAdd={(data) => onBulkAddEngineeringTestProcedures(data)}
            onBulkEdit={(data) => onBulkEditEngineeringTestProcedures(data)}
            onBulkDelete={(data) => onBulkDeleteEngineeringTestProcedures(data)}
            getAllResources={getAllEngineeringTestProcedures}
            renderResources={(engineeringTestProcedures) => (
                <EngineeringTestProcedureList engineeringTestProcedures={engineeringTestProcedures} />
            )}
            renderFormControlGroup={(FormControl) => (
                <VStack w="full">
                    <FormControl fieldName="title" />
                    <FormControl fieldName="details" />
                </VStack>
            )}
            getInitialValues={(engineeringTestProcedures) => engineeringTestProcedures}
        />
    );
};
