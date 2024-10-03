import { Button, Container, VStack } from "@volocopter/design-library-react";
import { FormProvider } from "@voloiq/form";
import { useEnterMetadataSchema } from "./useEnterMetaData";

type enterMetaDataProps = {
    changeUploadTileId: (newUploadTileId: string) => void;
};

export const EnterMetadataStep = (props: enterMetaDataProps) => {
    const { changeUploadTileId } = props;

    const { enterMetadataSchema, FormControl, onSubmitActions } = useEnterMetadataSchema({
        changeUploadTileId,
    });

    return (
        <Container pb="10">
            <FormProvider
                formId="enterMetadataSchema"
                schema={enterMetadataSchema}
                formType="create"
                onCreate={onSubmitActions}
            >
                <FormControl fieldName="vfr_type" />
                <FormControl fieldName="region_id" />
                <FormControl fieldName="file_name" />
                <FormControl fieldName="valid_to" />
            </FormProvider>

            <VStack width="100%" mt={4}>
                <Button width="100%" form="enterMetadataSchema" variant="primary" type="submit">
                    Submit
                </Button>
            </VStack>
        </Container>
    );
};
