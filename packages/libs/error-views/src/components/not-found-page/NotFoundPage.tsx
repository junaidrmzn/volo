import { SplashLayout, useColorModeValue } from "@volocopter/design-library-react";
import { useNavigate } from "react-router-dom";
import { useErrorViewsTranslation } from "../../translations/useErrorViewsTranslation";

export type NotFoundPageProps = {
    backRoute?: string;
};

export const NotFoundPage = (props: NotFoundPageProps) => {
    const { backRoute } = props;
    const { t } = useErrorViewsTranslation();
    const navigate = useNavigate();
    const errorColor = useColorModeValue("red.700", "red.300");

    return (
        <SplashLayout>
            <SplashLayout.Pictogram pictogram="alertCircle" color={errorColor} />
            <SplashLayout.Heading text={t("components.notFoundPage.heading")} />
            <SplashLayout.Description text={t("components.notFoundPage.description")} />
            <SplashLayout.Button onClick={() => (backRoute ? navigate(backRoute) : navigate(-1))}>
                {t("components.notFoundPage.button")}
            </SplashLayout.Button>
        </SplashLayout>
    );
};
