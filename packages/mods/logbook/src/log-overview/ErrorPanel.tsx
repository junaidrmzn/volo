import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@volocopter/design-library-react";
import type { useGetService } from "@voloiq/service";
import { useLogbookTranslation } from "./translations/useLogbookTranslation";

type ErrorPanelProps = { errors: Pick<ReturnType<typeof useGetService>, "error">["error"][] };

/**
 * @deprecated with resource overview
 */
export const ErrorPanel = (props: ErrorPanelProps) => {
    const { errors } = props;
    const { t } = useLogbookTranslation();

    return (
        <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="max"
            borderRadius="lg"
        >
            <AlertIcon />
            <AlertTitle mt={4} mb={1} fontSize="lg" lineHeight="none">
                {t("errorManagement.title")}
            </AlertTitle>
            {errors.map((error) => error && <AlertDescription lineHeight="base">{error.message}</AlertDescription>)}
        </Alert>
    );
};
