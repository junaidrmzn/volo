import { Button, Heading, Icon, Stack, Text, useColorModeValue } from "@volocopter/design-library-react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "@voloiq/auth";
import { useErrorViewsTranslation } from "../../translations/useErrorViewsTranslation";

export const UnauthorizedPage = () => {
    const { t } = useErrorViewsTranslation();
    const { logout } = useAuthentication();
    const navigate = useNavigate();
    const iconColor = useColorModeValue("red.700", "red.300");
    const descriptionColor = useColorModeValue("gray.300", "gray.200");

    return (
        <Stack justifyContent="center" alignItems="center" spacing={2} p={16}>
            <Icon icon="errorLight" color={iconColor} size={18} mb={4} />
            <Heading textAlign="center">{t("components.unauthorizedPage.title")}</Heading>
            <Text textAlign="center" color={descriptionColor}>
                {t("components.unauthorizedPage.description")}
            </Text>
            <Stack spacing={2} pt={2}>
                <Button variant="primary" onClick={logout}>
                    {t("components.unauthorizedPage.loginAsADifferentUserButton")}
                </Button>
                <Button variant="ghost" onClick={() => navigate(-1)}>
                    {t("components.unauthorizedPage.goBackButton")}
                </Button>
            </Stack>
        </Stack>
    );
};
