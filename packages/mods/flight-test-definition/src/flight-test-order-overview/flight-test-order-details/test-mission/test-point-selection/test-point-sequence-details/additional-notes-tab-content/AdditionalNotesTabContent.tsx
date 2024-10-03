import { FormLabel } from "@volocopter/design-library-react";
import { EditorTextDisplay, TextEditor, TextEditorProvider } from "@volocopter/text-editor-react";
import { Dispatch, SetStateAction } from "react";
import { fileToBase64 } from "@voloiq/flight-test-definition-utils";
import { buildTranslationObject, useTextEditorTranslation } from "@voloiq/form";
import { TextWithLabel } from "@voloiq/text-layouts";
import { useAdditionalNotesTabContentTranslation } from "./translations/useAdditionalNotesTabContentTranslation";

export type AdditionalNotesTabContentProps = {
    additionalNotes?: string;
    setAdditionalNotes: Dispatch<SetStateAction<string>>;
    isFtoEditable: boolean;
};

export const AdditionalNotesTabContent = (props: AdditionalNotesTabContentProps) => {
    const { additionalNotes, setAdditionalNotes, isFtoEditable } = props;

    const { t } = useAdditionalNotesTabContentTranslation();
    const { t: tEditor } = useTextEditorTranslation();
    const translation = buildTranslationObject(tEditor);

    return (
        <TextEditorProvider value={translation}>
            {isFtoEditable ? (
                <>
                    <FormLabel>{t("Additional Notes")}</FormLabel>
                    <TextEditor
                        onChange={setAdditionalNotes}
                        createImageSource={fileToBase64}
                        content={additionalNotes}
                    />
                </>
            ) : (
                <TextWithLabel
                    size="small"
                    label={t("Additional Notes")}
                    text={<EditorTextDisplay document={additionalNotes} />}
                />
            )}
        </TextEditorProvider>
    );
};
