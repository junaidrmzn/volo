import { Box, List, ListItem, SplashLayout, useColorModeValue } from "@volocopter/design-library-react";
import type { Error } from "@voloiq/service";
import { useErrorViewsTranslation } from "../../translations/useErrorViewsTranslation";

export type TechnicalErrorProps = {
    error?: Error;
    onTryAgainClick: () => void;
};

export const TechnicalError = (props: TechnicalErrorProps) => {
    const { error, onTryAgainClick } = props;
    const { t } = useErrorViewsTranslation();
    const errorColor = useColorModeValue("red.700", "red.300");

    return (
        <SplashLayout>
            <SplashLayout.Pictogram pictogram="alertCircle" color={errorColor} />
            <SplashLayout.Heading text={t("components.technicalError.heading")} />
            <SplashLayout.Description text={t("components.technicalError.description")} />
            {error && (
                <SplashLayout.AdditionalContent>
                    <Box>{t("components.technicalError.error", { error: error.message })}</Box>
                    {error?.details && (
                        <List listStyleType="initial" paddingLeft={8}>
                            {error?.details?.map((nestedError, index) => (
                                // eslint-disable-next-line react/no-array-index-key
                                <ListItem key={index}>{nestedError.message}</ListItem>
                            ))}
                        </List>
                    )}
                </SplashLayout.AdditionalContent>
            )}
            <SplashLayout.Button onClick={onTryAgainClick}>
                {t("components.technicalError.tryAgainButton")}
            </SplashLayout.Button>
        </SplashLayout>
    );
};
