export type SpecialCommentInsert = {
    comment: string;
};

export type SpecialComment = {
    id: string;
    comment: string;
};

export type SpecialCommentPatch = {
    id: string;
    comment?: string;
};
