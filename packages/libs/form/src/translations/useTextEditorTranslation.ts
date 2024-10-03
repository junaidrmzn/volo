import type { VerifiedTranslations } from "@voloiq/i18n";
import { useTranslation } from "@voloiq/i18n";
import de from "./textEditor.de.translations.json";
import en from "./textEditor.en.translations.json";

const translations = { en, de };
export const useTextEditorTranslation = () => useTranslation<VerifiedTranslations<typeof translations>>(translations);
type useTextEditorTranslationFunction = ReturnType<typeof useTextEditorTranslation>["t"];
export const buildTranslationObject = (t: useTextEditorTranslationFunction) => {
    const translation = {
        toggleBold: t("Toggle Bold"),
        toggleItalic: t("Toggle Italic"),
        toggleUnderline: t("Toggle Underline"),
        toggleStrikethrough: t("Toggle Strikethrough"),
        toggleSuperscript: t("Toggle Superscript"),
        toggleSubscript: t("Toggle Subscript"),
        toggleBulletedList: t("Toggle Bulleted List"),
        toggleNumberedList: t("Toggle Numbered List"),
        addImage: t("Add Image"),
        undo: t("Undo"),
        redo: t("Redo"),
    };
    return translation;
};
