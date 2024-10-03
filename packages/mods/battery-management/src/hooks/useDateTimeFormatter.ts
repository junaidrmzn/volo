import { useResourcesTranslation } from "../translations/useResourcesTranslation";

export const useDateTimeFormatter = () => {
    const { i18n } = useResourcesTranslation();
    const shortDateTime = new Intl.DateTimeFormat(i18n.language, { dateStyle: "short", timeStyle: "short" });

    const formatToShortDateTime = (dateString: string) => shortDateTime.format(new Date(dateString));

    return { formatToShortDateTime };
};
