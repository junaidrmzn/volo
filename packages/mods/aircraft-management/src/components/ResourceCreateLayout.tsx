import { Button, Header, HeaderLayout } from "@volocopter/design-library-react";
import { useNavigate } from "@voloiq/routing";
import { useResourcesTranslation } from "../translations/useResourcesTranslation";

export type ResourceCreateLayoutProps = {
    title: string;
    cancelButtonLabel?: string;
    addButtonLabel?: string;
    formName: string;
};

export const ResourceCreateLayout: FCC<ResourceCreateLayoutProps> = (props) => {
    const { title, cancelButtonLabel, addButtonLabel, children, formName } = props;
    const { t } = useResourcesTranslation();
    const navigation = useNavigate();
    const goBackToOverview = () => navigation("..");
    return (
        <HeaderLayout variant="secondary">
            <HeaderLayout.Header>
                <Header.Title
                    title={title}
                    hasReturnMarker
                    returnMarkerAriaLabel={t("generic.back button")}
                    onClick={goBackToOverview}
                />
                <Header.Controls>
                    <Button variant="secondary" onClick={goBackToOverview}>
                        {cancelButtonLabel ?? t("generic.cancel button")}
                    </Button>
                    <Button form={formName} variant="primary" type="submit">
                        {addButtonLabel ?? t("generic.add button")}
                    </Button>
                </Header.Controls>
            </HeaderLayout.Header>
            <HeaderLayout.Content alignWithTitle py={8} w="lg">
                {children}
            </HeaderLayout.Content>
        </HeaderLayout>
    );
};
