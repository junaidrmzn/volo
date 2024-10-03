import { Box } from "@volocopter/design-library-react";
import type { RenderEditHandler } from "@voloiq/resource-overview";
import { Parameter } from "../../libs/fti-api/apiModels";
import { EditParameterForm, ParameterFormSkeleton } from "../../libs/parameter-form";
import { AssignedAircrafts } from "./AssignedAircrafts";
import { CardWrapper } from "./CardWrapper";
import { EditableFtiBanner } from "./EditableFtiBanner";
import { useEditParameter } from "./useEditParameter";

export const EditParameter: RenderEditHandler<Parameter> = (props) => {
    const { resource, formRef } = props;

    const { data, isLoading, isParameterEditable, handleSubmit, ...assignAircraftProps } = useEditParameter(props);

    return (
        <>
            {isLoading ? (
                <CardWrapper>
                    <ParameterFormSkeleton />
                </CardWrapper>
            ) : (
                <Box gap={3}>
                    {!isParameterEditable && <EditableFtiBanner />}
                    <CardWrapper>
                        <EditParameterForm
                            formRef={formRef}
                            data={data}
                            onSubmit={handleSubmit}
                            initialValues={resource}
                            isParameterEditable={isParameterEditable}
                        />
                    </CardWrapper>

                    <CardWrapper>
                        <AssignedAircrafts {...assignAircraftProps} />
                    </CardWrapper>
                </Box>
            )}
        </>
    );
};
