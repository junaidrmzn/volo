import { VStack } from "@volocopter/design-library-react";
import { EditorTextDisplay } from "@volocopter/text-editor-react";
import type { ImportantNote } from "@voloiq/flight-test-definition-api/v1";
import { TextCard } from "@voloiq/flight-test-definition-components";

export type ImportantNotesSectionContentProps = {
    importantNotes: ImportantNote[];
};

export const ImportantNotesSectionContent = (props: ImportantNotesSectionContentProps) => {
    const { importantNotes } = props;

    return (
        <VStack spacing={3} borderColor="blue500Mono500" alignItems="stretch" p={3} borderRadius="sm">
            {importantNotes.map((importantNote) => (
                <TextCard
                    key={importantNote.title}
                    label={importantNote.title}
                    text={<EditorTextDisplay document={importantNote.note} />}
                />
            ))}
        </VStack>
    );
};
