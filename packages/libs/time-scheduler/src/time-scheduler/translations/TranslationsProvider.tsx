import type { TranslationsContextType } from "./TranslationsContext";
import { TranslationsContext } from "./TranslationsContext";

export type TranslationsProviderProps = {
    translations: TranslationsContextType;
};
export const TranslationsProvider: FCC<TranslationsProviderProps> = (props) => {
    const { children, translations } = props;

    return <TranslationsContext.Provider value={translations}>{children}</TranslationsContext.Provider>;
};
