import type { AttachedFile } from "./apiModels";

export const anyAttachedFile = (overwrites?: Partial<AttachedFile>): Required<AttachedFile> => ({
    id: "ce118b6e-d8e1-11e7-9296-cec278b6b50b",
    definitionId: "b2118b6e-d8e1-11e8-9a46-cec278b6b509",
    fileName: "221020414337.pdf",
    fileType: "pdf",
    fileSize: 71_159,
    updateTime: "",
    createTime: "",
    ...overwrites,
});
