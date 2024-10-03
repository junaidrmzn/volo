import { v4 as uuidV4 } from "uuid";
import type { ImportantNote, ImportantNoteInsert, ImportantNotePatchBulk } from "./apiModels";

export const anyImportantNote = (overwrites?: Partial<ImportantNote>): ImportantNote => ({
    id: uuidV4(),
    title: "Important Note Foo",
    note: "This is important!",
    ...overwrites,
});

export const anyImportantNoteInsert = (overwrites?: Partial<ImportantNoteInsert>): ImportantNoteInsert => ({
    title: "Important Note Foo",
    note: "This is important!",
    ...overwrites,
});

export const anyImportantNotePatchBulk = (overwrites?: Partial<ImportantNotePatchBulk>): ImportantNotePatchBulk => ({
    id: uuidV4(),
    title: "Important Note Foo",
    note: "This is important!",
    ...overwrites,
});
