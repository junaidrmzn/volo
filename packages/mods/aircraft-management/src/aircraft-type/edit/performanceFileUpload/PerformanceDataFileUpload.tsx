import { Button, Container } from "@volocopter/design-library-react";
import { useState } from "react";
import { FormProvider } from "@voloiq/form";
import { useParams } from "@voloiq/routing";
import { useResourcesTranslation } from "../../../translations/useResourcesTranslation";
import type { FormData } from "./usePerformanceDataFileUpload";
import { usePerformanceDataFileUpload } from "./usePerformanceDataFileUpload";

const useFileState = (defaultValue: boolean) => {
    return useState(defaultValue);
};

type PerformanceDataFileUploadProps = { version?: number };

export const PerformanceDataFileUpload = (props: PerformanceDataFileUploadProps) => {
    const { version } = props;
    const { aircraftTypeId } = useParams();
    const { performanceDataSchema, uploadFile, FormControl, isUploading } = usePerformanceDataFileUpload(
        aircraftTypeId,
        version
    );
    const { t } = useResourcesTranslation();
    const [isFileAppended, setIsFileAppended] = useFileState(false);

    const onClickUpload = (file: unknown) => {
        if (file && (file as File[]).length > 0) {
            setIsFileAppended(true);
        } else {
            setIsFileAppended(false);
        }
    };

    const initValues: FormData = {
        file: [],
    };

    return (
        <Container>
            <FormProvider
                schema={performanceDataSchema}
                formType="create"
                onCreate={uploadFile}
                initialValues={initValues}
            >
                <FormControl fieldName="file" onChange={onClickUpload} />
                {isFileAppended && (
                    <Button
                        type="submit"
                        variant="secondary"
                        isLoading={isUploading}
                        loadingText={t("aircraft-type.edit.uploading")}
                    >
                        {t("aircraft-type.edit.upload file")}
                    </Button>
                )}
            </FormProvider>
        </Container>
    );
};
