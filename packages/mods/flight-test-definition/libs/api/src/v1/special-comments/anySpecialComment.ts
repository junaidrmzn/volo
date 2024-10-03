import type { SpecialComment, SpecialCommentInsert, SpecialCommentPatch } from "./apiModels";

export const anySpecialComment = (overwrites?: Partial<SpecialComment>): SpecialComment => ({
    id: "b2118b6e-d8e1-11e8-9a46-cec278b6b509",
    comment: "Test-day conditions accepted. Ensure to record density altitude.",
    ...overwrites,
});

export const anySpecialCommentInsert = (overwrites?: Partial<SpecialCommentInsert>): SpecialCommentInsert => ({
    comment: "Test-day conditions accepted. Ensure to record density altitude.",
    ...overwrites,
});

export const anySpecialCommentPatch = (overwrites?: Partial<SpecialCommentPatch>): SpecialCommentPatch => ({
    id: "b2118b6e-d8e1-11e8-9a46-cec278b6b509",
    comment: "Test-day conditions accepted. Ensure to record density altitude.",
    ...overwrites,
});
