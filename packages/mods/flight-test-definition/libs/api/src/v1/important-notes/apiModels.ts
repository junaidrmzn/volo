export type ImportantNote = {
    id: string;
    title: string;
    note: string;
};

export type ImportantNoteInsert = {
    title: string;
    note: string;
};

export type ImportantNotePatchBulk = {
    id: string;
    title?: string;
    note?: string;
};
