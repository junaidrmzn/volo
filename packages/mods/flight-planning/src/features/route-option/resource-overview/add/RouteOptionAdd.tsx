import { Box, Card } from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import type { RenderAddHandlerProps } from "@voloiq/resource-overview";
import { RouteOptionAddSkeleton } from "../skeleton-loader";
import { useRouteOptionAddForm } from "./useRouteOptionAddForm";

type RouteOptionAddProps = RenderAddHandlerProps;
export const RouteOptionAdd = (props: RouteOptionAddProps) => {
    const { formRef } = props;
    const { FormControl, createRouteOptionSchema, handleCreate, isLoading } = useRouteOptionAddForm();

    return (
        <Card>
            <Box width="100%" px={4} pb={5} flexGrow={1} overflowY="visible">
                {isLoading ? (
                    <RouteOptionAddSkeleton />
                ) : (
                    <FormProvider
                        formId="createRouteOptionSchema"
                        schema={createRouteOptionSchema}
                        formRef={formRef}
                        formType="create"
                        initialValues={{}}
                        onCreate={handleCreate}
                    >
                        <FormControl fieldName="name" />
                        <FormControl fieldName="aircraftType" />
                        <FormControl fieldName="departureVertiport" />
                        <FormControl fieldName="arrivalVertiport" />
                    </FormProvider>
                )}
            </Box>
        </Card>
    );
};
