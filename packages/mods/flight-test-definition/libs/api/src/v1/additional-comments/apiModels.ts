export type AdditionalCommentInsert = {
    comment: string;
};

export type AdditionalComment = {
    id: string;
    comment: string;
};

export type AdditionalCommentPatchBulk = Partial<AdditionalCommentInsert> & {
    id: string;
};
